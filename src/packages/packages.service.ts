import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import { PrismaService } from 'nestjs-prisma';

import type {
  Package,
  LabTestsOnPackages,
  Item,
  ItemType,
  PackageTag,
  Strain,
  Uom,
} from '@prisma/client';

export type PackageWithNestedData = Package & {
  tag: PackageTag;
  item: ItemWithNesting;
  labTests: LabTestsOnPackages[];
  uom: Uom;
  sourcePackages: PackageWithNestedData[];
};

export type ItemWithNesting = Item & {
  itemType: ItemType;
  strain: Strain;
};

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async create(createPackageDto: CreatePackageDto) {
    // 'This action adds a new package';
    // Transaction to ensure that the package is created and parent package is updated.
    const createPackage = this.prisma.package.create({
      data: {
        quantity: createPackageDto.quantity,
        uom: {
          connect: {
            id: createPackageDto.uomId,
          },
        },
        tag: {
          connect: {
            id: createPackageDto.tagId,
          },
        },
        item: {
          connect: {
            id: createPackageDto.itemId,
          },
        },
        sourcePackages: {
          connect: {
            id: createPackageDto.sourcePackageId,
          },
        },
        labTests: {
          create: [
            {
              labTestId: createPackageDto.inheritedLabTestIds,
              assignedBy: 'packageCreation',
            },
          ],
        },
      },
    });

    const updateSourcePackage = this.prisma.package.update({
      where: { id: createPackageDto.sourcePackageId },
      data: {
        quantity: createPackageDto.newParentQuantity,
      },
    });

    const updateTagStatus = this.prisma.packageTag.update({
      where: { id: createPackageDto.tagId },
      data: {
        isAssigned: true,
      },
    });

    await this.prisma.$transaction([
      createPackage,
      updateSourcePackage,
      updateTagStatus,
    ]);
  }

  findAll() {
    // `This action returns all packages with associated data`;
    return this.prisma.package.findMany({
      include: {
        tag: true,
        uom: true,
        item: {
          include: {
            itemType: {
              include: {
                uomDefault: {},
              },
            },
            strain: true,
          },
        },
        labTests: {
          include: {
            labTest: {
              select: {
                thcTotalPercent: true,
                cbdPercent: true,
                terpenePercent: true,
                overallPassed: true,
                totalCannabinoidsPercent: true,
                batchCode: true,
                testIdCode: true,
              },
            },
          },
        },
      },
    });
  }

  findAllFlat() {
    // `This action returns all packages flattened`;
    return this.prisma.package.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackagesDto: UpdatePackagesDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}

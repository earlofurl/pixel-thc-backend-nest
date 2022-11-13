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
import { AssignTagDto } from './dto/assign-tag.dto';

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
    console.log('createPackageDto', createPackageDto);

    const {
      tagId,
      sourcePackageId,
      inheritedLabTestIds,
      itemId,
      quantity,
      uomId,
      newParentQuantity,
      notes,
    } = createPackageDto;

    const createPackage = this.prisma.package.create({
      data: {
        quantity: quantity,
        uom: {
          connect: {
            id: uomId,
          },
        },
        tag: {
          connect: {
            id: tagId,
          },
        },
        item: {
          connect: {
            id: itemId,
          },
        },
        sourcePackages: {
          connect: {
            id: sourcePackageId,
          },
        },
        labTests: {
          create: [
            {
              labTestId: inheritedLabTestIds,
              assignedBy: 'packageCreation',
            },
          ],
        },
        notes,
      },
    });

    const updateSourcePackage = this.prisma.package.update({
      where: { id: sourcePackageId },
      data: {
        quantity: newParentQuantity,
      },
    });

    const updateTagStatus = this.prisma.packageTag.update({
      where: { id: tagId },
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

  async assignTag(assignTagDto: AssignTagDto) {
    const { tagId, packageId } = assignTagDto;

    const updateTagStatus = this.prisma.packageTag.update({
      where: { id: tagId },
      data: {
        isAssigned: true,
      },
    });

    const updateTagOnPackage = this.prisma.package.update({
      where: { id: packageId },
      data: {
        tag: {
          connect: {
            id: tagId,
          },
        },
      },
    });

    await this.prisma.$transaction([updateTagStatus, updateTagOnPackage]);
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
        sourcePackages: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  findByOrderId(id: string) {
    // `This action returns all packages with associated data`;
    return this.prisma.package.findMany({
      where: { orderId: id },
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
        sourcePackages: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async findOne(tagNumber: string) {
    // `This action returns the package with specified tag number`;
    const tag = await this.prisma.packageTag.findUnique({
      where: {
        tagNumber,
      },
    });
    const packageMatch = await this.prisma.package.findUnique({
      where: {
        tagId: tag.id,
      },
    });

    return packageMatch;
  }

  update(id: number, updatePackagesDto: UpdatePackagesDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}

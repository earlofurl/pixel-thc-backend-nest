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

  create(createPackageDto: CreatePackageDto) {
    return 'This action adds a new package';
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

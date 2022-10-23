import { PackageTag } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreatePackageTagDto } from './dto/create-package-tag.dto';
import { UpdatePackageTagDto } from './dto/update-package-tag.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PackageTagsService {
  constructor(private prisma: PrismaService) {}

  create(createPackageTagDto: CreatePackageTagDto) {
    return 'This action adds a new packageTag';
  }

  findAll(): Promise<PackageTag[]> {
    // `This action returns all packageTags`;
    return this.prisma.packageTag.findMany();
  }

  findMany(assigned: string, quantity: string): Promise<PackageTag[]> {
    // `This action returns multiple packageTags based on params`;
    const assignedBool = assigned === 'true';
    const quantityInt = parseInt(quantity, 10);

    return this.prisma.packageTag.findMany({
      where: {
        isAssigned: assignedBool,
      },
      orderBy: {
        tagNumber: 'asc',
      },
      take: quantityInt,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} packageTag`;
  }

  update(id: number, updatePackageTagDto: UpdatePackageTagDto) {
    return `This action updates a #${id} packageTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} packageTag`;
  }
}

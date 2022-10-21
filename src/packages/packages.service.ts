import { Injectable } from '@nestjs/common';
import { CreatePackagesDto } from './dto/create-packages.dto';
import { UpdatePackagesDto } from './dto/update-packages.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  create(createPackagesDto: CreatePackagesDto) {
    return 'This action adds a new package';
  }

  findAll() {
    // `This action returns all packages`;
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

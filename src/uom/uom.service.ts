import type { Uom } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUomDto } from './dto/create-uom.dto';
import { UpdateUomDto } from './dto/update-uom.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UomService {
  constructor(private prisma: PrismaService) {}

  create(createUomDto: CreateUomDto) {
    return 'This action adds a new uom';
  }

  findAll() {
    // `This action returns all uom`;
    return this.prisma.uom.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} uom`;
  }

  update(id: number, updateUomDto: UpdateUomDto) {
    return `This action updates a #${id} uom`;
  }

  remove(id: number) {
    return `This action removes a #${id} uom`;
  }
}

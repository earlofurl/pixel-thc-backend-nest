import type { Uom } from '@prisma/client';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateUomDto } from './dto/create-uom.dto';
import { UpdateUomDto } from './dto/update-uom.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UomService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  create(createUomDto: CreateUomDto) {
    return 'This action adds a new uom';
  }

  async findAll(): Promise<Uom[]> {
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

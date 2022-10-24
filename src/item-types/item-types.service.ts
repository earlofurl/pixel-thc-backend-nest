import { Injectable } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { PrismaService } from 'nestjs-prisma';

import type { ItemType } from '@prisma/client';

@Injectable()
export class ItemTypesService {
  constructor(private prisma: PrismaService) {}

  create(createItemTypeDto: CreateItemTypeDto) {
    return 'This action adds a new itemType';
  }

  findAll(): Promise<ItemType[]> {
    // `This action returns all itemTypes`;
    return this.prisma.itemType.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} itemType`;
  }

  update(id: number, updateItemTypeDto: UpdateItemTypeDto) {
    return `This action updates a #${id} itemType`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemType`;
  }
}

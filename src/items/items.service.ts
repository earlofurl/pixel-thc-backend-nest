import type { Item, ItemType, Strain } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'nestjs-prisma';

export type ItemWithNesting = Item & {
  itemType: ItemType;
  strain: Strain;
};

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    // `This action returns all items`;
    return this.prisma.item.findMany({
      include: {
        strain: true,
        itemType: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}

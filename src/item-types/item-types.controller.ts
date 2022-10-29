import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import type { ItemType } from '@prisma/client';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { ItemTypesService } from './item-types.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';

@UseGuards(LoggedInGuard)
@Controller('item-types')
export class ItemTypesController {
  constructor(private readonly itemTypesService: ItemTypesService) {}

  @Post()
  create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypesService.create(createItemTypeDto);
  }

  @Get()
  findAll(): Promise<ItemType[]> {
    return this.itemTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ) {
    return this.itemTypesService.update(+id, updateItemTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypesService.remove(+id);
  }
}

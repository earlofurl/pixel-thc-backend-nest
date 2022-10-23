import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import type { PackageTag } from '@prisma/client';
import { PackageTagsService } from './package-tags.service';
import { CreatePackageTagDto } from './dto/create-package-tag.dto';
import { UpdatePackageTagDto } from './dto/update-package-tag.dto';

@Controller('package-tags')
export class PackageTagsController {
  constructor(private readonly packageTagsService: PackageTagsService) {}

  @Post()
  create(@Body() createPackageTagDto: CreatePackageTagDto) {
    return this.packageTagsService.create(createPackageTagDto);
  }

  @Get('/all')
  findAll(): Promise<PackageTag[]> {
    return this.packageTagsService.findAll();
  }

  @Get(':assigned/:quantity')
  findMany(@Param() params): Promise<PackageTag[]> {
    return this.packageTagsService.findMany(params.assigned, params.quantity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageTagsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePackageTagDto: UpdatePackageTagDto,
  ) {
    return this.packageTagsService.update(+id, updatePackageTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageTagsService.remove(+id);
  }
}

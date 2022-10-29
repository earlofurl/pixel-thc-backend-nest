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
import type { Strain } from '@prisma/client';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { StrainsService } from './strains.service';
import { CreateStrainDto } from './dto/create-strain.dto';
import { UpdateStrainDto } from './dto/update-strain.dto';

@UseGuards(LoggedInGuard)
@Controller('strains')
export class StrainsController {
  constructor(private readonly strainsService: StrainsService) {}

  @Post()
  create(@Body() createStrainDto: CreateStrainDto) {
    return this.strainsService.create(createStrainDto);
  }

  @Get()
  findAll(): Promise<Strain[]> {
    return this.strainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.strainsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStrainDto: UpdateStrainDto) {
    return this.strainsService.update(+id, updateStrainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.strainsService.remove(+id);
  }
}

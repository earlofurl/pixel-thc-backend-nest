import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  UseGuards,
} from '@nestjs/common';
import type { Uom } from '@prisma/client';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { UomService } from './uom.service';
import { CreateUomDto } from './dto/create-uom.dto';
import { UpdateUomDto } from './dto/update-uom.dto';

@UseGuards(LoggedInGuard)
@Controller('uom')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Post()
  create(@Body() createUomDto: CreateUomDto) {
    return this.uomService.create(createUomDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get()
  findAll(): Promise<Uom[]> {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findAll UoMs');
    }
    return this.uomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GET findOne id UoM');
    }
    return this.uomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUomDto: UpdateUomDto) {
    return this.uomService.update(+id, updateUomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uomService.remove(+id);
  }
}

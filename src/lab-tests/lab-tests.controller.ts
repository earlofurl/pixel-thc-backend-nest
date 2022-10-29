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
import type { LabTest } from '@prisma/client';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { LabTestsService } from './lab-tests.service';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';

@UseGuards(LoggedInGuard)
@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @Get()
  findAll(): Promise<LabTest[]> {
    return this.labTestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestsService.remove(+id);
  }
}

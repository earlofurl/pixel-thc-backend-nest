import { Injectable } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { PrismaService } from 'nestjs-prisma';

import type { LabTest } from '@prisma/client';

@Injectable()
export class LabTestsService {
  constructor(private prisma: PrismaService) {}

  create(createLabTestDto: CreateLabTestDto) {
    return 'This action adds a new labTest';
  }

  findAll(): Promise<LabTest[]> {
    // `This action returns all labTests`;
    return this.prisma.labTest.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} labTest`;
  }

  update(id: number, updateLabTestDto: UpdateLabTestDto) {
    return `This action updates a #${id} labTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} labTest`;
  }
}

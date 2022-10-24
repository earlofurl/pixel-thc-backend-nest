import { Injectable } from '@nestjs/common';
import { CreateStrainDto } from './dto/create-strain.dto';
import { UpdateStrainDto } from './dto/update-strain.dto';
import { PrismaService } from 'nestjs-prisma';

import type { Strain } from '@prisma/client';

@Injectable()
export class StrainsService {
  constructor(private prisma: PrismaService) {}

  create(createStrainDto: CreateStrainDto) {
    return 'This action adds a new strain';
  }

  findAll() {
    // `This action returns all strains`;
    return this.prisma.strain.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} strain`;
  }

  update(id: number, updateStrainDto: UpdateStrainDto) {
    return `This action updates a #${id} strain`;
  }

  remove(id: number) {
    return `This action removes a #${id} strain`;
  }
}

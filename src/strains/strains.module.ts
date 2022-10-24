import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { StrainsService } from './strains.service';
import { StrainsController } from './strains.controller';

@Module({
  imports: [PrismaModule],
  controllers: [StrainsController],
  providers: [StrainsService],
})
export class StrainsModule {}

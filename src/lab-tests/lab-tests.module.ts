import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { LabTestsController } from './lab-tests.controller';

@Module({
  imports: [PrismaModule],
  controllers: [LabTestsController],
  providers: [LabTestsService],
})
export class LabTestsModule {}

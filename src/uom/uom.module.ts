import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { UomService } from './uom.service';
import { UomController } from './uom.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UomController],
  providers: [UomService],
})
export class UomModule {}

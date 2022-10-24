import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { ItemTypesService } from './item-types.service';
import { ItemTypesController } from './item-types.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ItemTypesController],
  providers: [ItemTypesService],
})
export class ItemTypesModule {}

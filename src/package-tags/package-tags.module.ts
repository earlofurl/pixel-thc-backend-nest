import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { PackageTagsService } from './package-tags.service';
import { PackageTagsController } from './package-tags.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PackageTagsController],
  providers: [PackageTagsService],
})
export class PackageTagsModule {}

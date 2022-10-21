import { PrismaModule } from 'nestjs-prisma';
import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}

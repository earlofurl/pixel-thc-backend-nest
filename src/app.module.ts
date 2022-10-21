import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'nestjs-prisma';
import { PackageModule } from './package/package.module';

@Module({
  imports: [PackageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

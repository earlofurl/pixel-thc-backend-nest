import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'nestjs-prisma';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [PackagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

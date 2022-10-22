import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'nestjs-prisma';
import { PackagesModule } from './packages/packages.module';
import { OrdersModule } from './orders/orders.module';
import { PackageTagsModule } from './package-tags/package-tags.module';

@Module({
  imports: [PackagesModule, OrdersModule, PackageTagsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

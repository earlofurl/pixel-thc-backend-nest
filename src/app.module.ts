import { CacheModule, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'nestjs-prisma';
import { PackagesModule } from './packages/packages.module';
import { OrdersModule } from './orders/orders.module';
import { PackageTagsModule } from './package-tags/package-tags.module';
import { ItemsModule } from './items/items.module';
import { UomModule } from './uom/uom.module';
import { LabTestsModule } from './lab-tests/lab-tests.module';
import { StrainsModule } from './strains/strains.module';
import { ItemTypesModule } from './item-types/item-types.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PackagesModule,
    OrdersModule,
    PackageTagsModule,
    ItemsModule,
    UomModule,
    LabTestsModule,
    StrainsModule,
    ItemTypesModule,
    CacheModule.register({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: async () =>
        await redisStore({
          // Store-specific configuration:
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            passphrase: process.env.REDIS_PASSWORD,
          },
        }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

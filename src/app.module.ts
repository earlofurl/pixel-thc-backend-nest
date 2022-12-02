import {
  Inject,
  Logger,
  MiddlewareConsumer,
  NestModule,
  CacheModule,
  Module,
} from '@nestjs/common';
// import type { RedisClientType } from 'redis';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
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
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import * as redisNode from 'redis';
import { RedisClientType } from 'redis';

// type RedisClient = RedisClientType<
//   redisNode.RedisModules,
//   redisNode.RedisFunctions,
//   redisNode.RedisScripts
// >;
const redisClient = redisNode.createClient({
  legacyMode: true,
}) as RedisClientType<any, any, any>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type RedisClient = ReturnType<typeof redisClient>;

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
          username: process.env.REDIS_USER,
          password: process.env.REDIS_PASSPHRASE,
          // Store-specific configuration:
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            passphrase: process.env.REDIS_PASSPHRASE,
          },
        }),
    }),
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, Logger],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'TheMost69Secret420String8008Ever5483713571',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 15 * 24 * 60 * 60 * 1000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

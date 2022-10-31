import { Module } from '@nestjs/common';
import * as Redis from 'redis';

import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async () => {
        const client = Redis.createClient({
          url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          legacyMode: true,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}

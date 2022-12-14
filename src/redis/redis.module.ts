import { Module } from '@nestjs/common';
import * as Redis from 'redis';

import { REDIS } from './redis.constants';
const redisUser = process.env.REDIS_USER;
const redisPass = process.env.REDIS_PASSPHRASE;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

const redisUrl = `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}`;
// let redisUrl = '';
// if (process.env.NODE_ENV === 'production') {
//   redisUrl = `redis://${redisPass}@${redisHost}:${redisPort}`;
// } else {
//   redisUrl = `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}`;
// }

// const redisUrl = `redis://${redisUser}:${redisPass}@${redisHost}:${redisPort}`;
// const redisUrl = `redis://${redisHost}:${redisPort}`;

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async () => {
        const client = Redis.createClient({
          url: redisUrl,
          username: 'default',
          password: process.env.REDIS_PASSPHRASE,
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

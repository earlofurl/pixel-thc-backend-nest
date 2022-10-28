import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // const CORS_OPTIONS = {
  //   origin: ['0.0.0.0:3069'], // '*' or '0.0.0.0:3069' or other depending on server
  //   allowedHeaders: [
  //     'Access-Control-Allow-Origin',
  //     'Origin',
  //     'X-Requested-With',
  //     'Accept',
  //     'Content-Type',
  //     'Authorization',
  //   ],
  //   exposedHeaders: 'Authorization',
  //   credentials: true,
  //   methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  // };

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v1');

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // prisma exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3420, '::');

  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

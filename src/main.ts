import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  const logger = app.get(Logger);
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
  app.setGlobalPrefix('api/v1', {
    exclude: ['auth/register', 'auth/login', 'auth', 'protected', 'admin'],
  });

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // prisma exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3420, '::');

  logger.log(`Application listening at ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

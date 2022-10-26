import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // prisma exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  if (process.env.NODE_ENV === 'development') {
    await app.listen(3000, '0.0.0.0', () =>
      console.log(`DEV Listening on port: 3000`),
    );
  } else {
    app.enableCors();
    await app.listen(3420, '0.0.0.0', () =>
      console.log(`PROD Listening on port: 3420`),
    );
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

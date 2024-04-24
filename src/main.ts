import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://one11-front.vercel.app'],
  });

  await app.listen(8080);
}

bootstrap().then();

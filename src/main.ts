import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://one11-front.vercel.app',
      'http://localhost:5173',
      'https://sportify360.pl',
    ],
  });

  await app.listen(8080);
}

bootstrap().then();

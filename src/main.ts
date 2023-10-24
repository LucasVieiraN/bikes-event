import 'reflect-metadata'

import * as dotenv from 'dotenv'

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config()
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);

  console.log(`🚀 Server is running on port: ${process.env.PORT}.`)
}
bootstrap();

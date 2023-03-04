const PORT = process.env.PORT || 4002;
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(new ValidationPipe());

  server.use(
    cors({
      credentials: true,
      origin: '*',
    }),
  );

  server.use(express.json());

  await app.listen(PORT);

  console.log(`gateway is on ${PORT}`);
}
bootstrap();

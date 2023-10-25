import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { SerializedGraph } from '@nestjs/core/inspector/serialized-graph';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });

  app.use(morgan('dev'));

  /* CORS */

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(' ')
    : [];

  const corsOptions = {
    origin: (
      origin: string,
      callback: (err: Error, value?: string) => void,
    ) => {
      origin = origin?.split(',')[0];
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.findIndex((o) => o === origin) > -1
      ) {
        return callback(null, origin);
      }
      return callback(new Error(`origin ${origin} is not allowed`));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    //allowedHeaders: '*',
  };

  app.enableCors(corsOptions);

  /* Global pipe */

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  /* Swagger API - Generate API documentation */
  const config = new DocumentBuilder()
    .setTitle('Tree count Api')
    .setDescription('The tree count api description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('', app, document);

  /*******************************************/

  await app.listen(3099);
  writeFileSync('./graph.json', app.get(SerializedGraph).toString()); // test
}
bootstrap();

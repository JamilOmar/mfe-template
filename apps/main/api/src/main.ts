/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { readFileSync } from 'fs';
function getApiMetadata(): {
  name: string;
  version: string;
  description: string;
} {
  const apiProjectPkg = join(__dirname, 'package.json');
  const file = readFileSync(apiProjectPkg);
  const pkgJson = JSON.parse(file.toString());

  return {
    version: pkgJson.version,
    description: pkgJson.description,
    name: pkgJson.name,
  };
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = process.env.API_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3333;
  const metadata = getApiMetadata();
  const config = new DocumentBuilder()
    .setTitle(metadata.name)
    .setDescription(metadata.description)
    .setVersion(metadata.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/explorer`, app, document);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

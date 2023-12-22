import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const logger = new Logger();

  await app.listen(port);

  logger.verbose(`🍻🍻🍻 App running on: http://localhost:${port} 🍻🍻🍻\n`);
}
bootstrap();

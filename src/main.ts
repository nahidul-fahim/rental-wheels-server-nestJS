import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port, async () => {
    console.log(`=======Server running on port ${port}=======`);
  });
}
bootstrap();

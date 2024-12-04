import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rental Wheels Server')
    .setDescription('The Rental Wheels Server API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1', app, documentFactory);

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port, async () => {
    console.log(`=======Server running on port ${port}=======`);
  });
}
bootstrap();

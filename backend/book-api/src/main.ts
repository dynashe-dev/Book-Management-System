import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation for dtos
  app.useGlobalPipes(new ValidationPipe());

  // Set global API prefix — all routes accessible under /api/*
  app.setGlobalPrefix('api');

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('API for managing books')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    // Swagger moved to /docs to avoid collision with /api global prefix
    SwaggerModule.setup('docs', app, document);

    // Enaable CORS for frontend
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Book API is running on http://localhost:${port}`);
  console.log(`REST API available at http://localhost:${port}/api`);
  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
}
bootstrap();

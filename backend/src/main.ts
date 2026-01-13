import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Enable CORS (Cross-Origin Resource Sharing)
   * Allows frontend (localhost:3000) to call backend (localhost:4000)
   * 
   * Without this: Browser blocks requests with CORS error
   */
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Frontend URLs
    credentials: true, // Allow cookies
  });

  /**
   * Global Validation Pipe
   * Automatically validates all DTOs using class-validator decorators
   * 
   * Options:
   * - whitelist: Strip properties not in DTO (security)
   * - transform: Auto-convert types (string "5" → number 5)
   * 
   * Note: Removed forbidNonWhitelisted to allow browser metadata
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip extra properties silently
      transform: true, // Auto-transform query params to correct types
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT ?? 4000}`);
}
bootstrap();

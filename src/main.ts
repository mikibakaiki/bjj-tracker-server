import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  app.enableCors(); // This enables CORS for all origins

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

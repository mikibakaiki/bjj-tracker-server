import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix for all routes
  // app.setGlobalPrefix('api');

  // app.enableCors(); // This enables CORS for all origins

  // Enable CORS for your frontend domain
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

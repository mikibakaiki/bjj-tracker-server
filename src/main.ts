import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Set global prefix for all routes
    app.setGlobalPrefix('api', {
      exclude: ['/health', '/', 'favicon.ico'],
    });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
        whitelist: true,
      }),
    );
    // CORS configuration based on environment
    const environment = process.env.NODE_ENV || 'development';
    const corsConfigs = {
      development: {
        origin: true,
        credentials: true,
      },
      production: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    };

    const corsConfig = corsConfigs[environment] || { origin: false };
    app.enableCors(corsConfig);

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(
      `Running in ${environment} mode - CORS config: ${JSON.stringify(corsConfig)}`,
    );
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    console.error(`Failed to start application: ${error.message}`, error.stack);
    process.exit(1);
  }
}

bootstrap();

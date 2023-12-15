import { ConfigModule, ConfigService } from '@nestjs/config';
import { Kimono, KimonoSchema } from './kimono/schemas/kimono.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KimonoModule } from './kimono/kimono.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      // ignoreEnvFile: process.env.NODE_ENV === 'production', // Optionally ignore .env file in production
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('ATLAS_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    KimonoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

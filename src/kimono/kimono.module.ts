import { Kimono, KimonoSchema } from './schemas/kimono.schema';

import { KimonoController } from './kimono.controller';
import { KimonoService } from './kimono.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kimono.name, schema: KimonoSchema }]),
  ],
  controllers: [KimonoController],
  providers: [KimonoService],
})
export class KimonoModule {}

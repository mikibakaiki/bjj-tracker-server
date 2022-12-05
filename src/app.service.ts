import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Kimono } from './kimono/schemas/kimono.schema';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
}

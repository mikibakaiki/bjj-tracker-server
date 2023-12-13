import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ collection: 'kimono' })
export class Kimono extends Document {
  @Prop()
  name: string;

  @Prop([Number])
  price: number[];

  @Prop([Number])
  former_price: number[];

  @Prop([Number])
  discount: number[];

  @Prop()
  url: string;

  @Prop([Date])
  timestamp: Date[];

  @Prop()
  img: string;
}

export const KimonoSchema = SchemaFactory.createForClass(Kimono);

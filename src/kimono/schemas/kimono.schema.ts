import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
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

  @Prop({
    type: [Date],
    required: true,
    get: (dates: Date[]) =>
      dates.map((date) => DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')),
    set: (dates: string[]) =>
      dates.map((date) => DateTime.fromFormat(date, 'dd/MM/yyyy').toJSDate()),
  })
  timestamp: Date[];

  @Prop()
  img: string;
}

export const KimonoSchema = SchemaFactory.createForClass(Kimono);

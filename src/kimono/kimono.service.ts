import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Kimono } from './schemas/kimono.schema';

@Injectable()
export class KimonoService {
  constructor(
    @InjectModel(Kimono.name) private readonly kimonoModel: Model<Kimono>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    console.log(paginationQuery);
    const filter = paginationQuery.filter ? { name: { $regex: this.escapeRegExp(paginationQuery.filter), $options: 'i' } } : {};
    const kimonos = await this.kimonoModel
      .find(filter)
      .skip(paginationQuery.offset)
      .limit(paginationQuery.limit)
      .exec();
    kimonos.forEach(kimono => console.log(kimono.name));

    return kimonos;
  }

  escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async findOne(id: string) {
    const kimono = await this.kimonoModel.findOne({ _id: id }).exec();
    if (!kimono) {
      throw new NotFoundException(`Kimono with id ${id} does not exist`);
    }
    return kimono;
  }
}

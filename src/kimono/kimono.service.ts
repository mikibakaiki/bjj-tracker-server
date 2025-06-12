import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Kimono } from './schemas/kimono.schema';
import { DateTime } from 'luxon';

@Injectable()
export class KimonoService {
  constructor(
    @InjectModel(Kimono.name) private readonly kimonoModel: Model<Kimono>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const {
      search = '',
      timePeriod = 'all',
      sortDirection = 'asc',
      limit = 20,
      offset = 0,
    } = paginationQuery;

    // Build time filter
    const timeFilter = this.buildTimeFilter(timePeriod);

    // Build search query
    const searchQuery = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...searchQuery,
          ...timeFilter,
        },
      },
      {
        $set: {
          currentPrice: { $last: '$price' }, // Get last price directly
          currentDate: { $last: '$timestamp' },
        },
      },
      {
        $sort: {
          currentPrice: sortDirection === 'asc' ? 1 : -1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ];
    // Combine filters
    const query = {
      ...searchQuery,
      ...timeFilter,
    };

    // Debug logs
    console.log('Time filter:', timeFilter);
    console.log('Final query:', query);

    // Get total count for pagination
    const [result] = await this.kimonoModel.aggregate(pipeline);
    const total = result.metadata[0]?.total ?? 0;

    return {
      kimonos: result.data,
      total,
      hasMore: total > offset + limit,
    };
  }

  private buildTimeFilter(timePeriod: string) {
    if (timePeriod === 'all') return {};

    const now = DateTime.now();
    const periods = {
      today: now.minus({ days: 1 }),
      '1month': now.minus({ months: 1 }),
      '3months': now.minus({ months: 3 }),
      '6months': now.minus({ months: 6 }),
      '1year': now.minus({ years: 1 }),
    };

    const date = periods[timePeriod];
    if (!date) return {};

    // Convert date to ISO format for MongoDB
    const isoDate = date.toJSDate();

    return {
      timestamp: {
        $elemMatch: {
          $gte: isoDate,
        },
      },
    };
  }

  // escapeRegExp(string: string) {
  //   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // }

  async findOne(id: string) {
    const kimono = await this.kimonoModel.findOne({ _id: id }).exec();
    if (!kimono) {
      throw new NotFoundException(`Kimono with id ${id} does not exist`);
    }

    // Transform dates for single kimono
    const processedKimono = {
      ...kimono.toObject(),
      timestamp: kimono.timestamp.map((date) =>
        DateTime.fromJSDate(new Date(date)).toFormat('dd/MM/yyyy'),
      ),
    };

    return processedKimono;
  }
}

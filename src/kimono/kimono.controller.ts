import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

import { KimonoService } from './kimono.service';

@Controller('kimonos')
export class KimonoController {
  constructor(private readonly kimonoService: KimonoService) {}

  @Get()
  getAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.kimonoService.findAll(paginationQuery);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.kimonoService.findOne(id);
  }
}

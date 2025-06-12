import { IsIn, IsOptional, IsString, IsInt } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['all', '1year', '6months', '3months', '1month', 'today'])
  timePeriod?: string = 'today';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortDirection?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 20;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number = 0;
}

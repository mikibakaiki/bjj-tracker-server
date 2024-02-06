import { IsOptional, IsPositive, IsString } from '@nestjs/class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsString()
  filter: string;
}

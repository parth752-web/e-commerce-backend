import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class DateFilterQueryDto {
  @ApiProperty({
    description: 'Start time (ISO 8601 format), must be in UTC timezone',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  startDate?: string;

  @ApiProperty({
    description: 'The end date (ISO 8601 format), must be in UTC timezone',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  endDate?: string;
}

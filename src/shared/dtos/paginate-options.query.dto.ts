import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginateOptionsQueryDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  page: number;

  @ApiProperty({
    description: 'Limit',
    example: 10,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  limit: number;

  @ApiProperty({ description: 'Search query', required: true })
  search?: string;

  constructor() {
    this.page = 1; // set default page value to 1
    this.limit = 10; // set default limit value to 10
  }
}

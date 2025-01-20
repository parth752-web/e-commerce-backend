import { ApiProperty } from '@nestjs/swagger';

export class PaginateCommonResDto {
  @ApiProperty({
    description: 'The total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'The current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'The total number of pages',
    example: 10,
  })
  totalPages: number;
}

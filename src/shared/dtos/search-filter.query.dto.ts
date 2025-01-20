import { ApiProperty } from '@nestjs/swagger';

export class SearchOptionsQueryDto {
  @ApiProperty({
    description: 'Search query',
    required: false,
  })
  search: string;

  constructor() {
    this.search = '';
  }
}

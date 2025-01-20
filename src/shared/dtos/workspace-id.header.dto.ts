import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WorkspaceIdHeaderDto {
  @ApiProperty({
    description: 'Workspace ID',
  })
  @IsNotEmpty()
  'x-workspace-id': string;
}

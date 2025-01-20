import { ApiProperty } from '@nestjs/swagger';
import { AccessRoles } from '../../enums/access.enum';

export class WorkspaceMember {
  @ApiProperty({
    example: '5f9f1c9c0b9b9c0b9b9c0b9b',
    description: 'Member ID',
  })
  _id?: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Member email',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Member name',
  })
  name?: string;

  @ApiProperty({
    example: 'owner',
    description: 'Member role',
    enum: AccessRoles,
  })
  role?: AccessRoles;
}

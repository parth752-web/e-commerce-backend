import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../schemas/user.schema';

export class LoginResponse {
  @ApiProperty({
    description: 'Message to the user',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'The access token',
  })
  accessToken: string;

  @ApiProperty()
  user: User;
}

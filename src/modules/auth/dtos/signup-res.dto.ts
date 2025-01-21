import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../schemas/user.schema';

export class SignupResponse {
  @ApiProperty({
    example: 'Please check your email for the verification code',
  })
  message: string;

  @ApiProperty({
    description: 'The access token',
  })
  accessToken: string;

  @ApiProperty()
  user: User;
}

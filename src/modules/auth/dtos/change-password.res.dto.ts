import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResponse {
  @ApiProperty({ description: 'Message to the user', example: 'Your password has been changed successfully' })
  message: string;

  @ApiProperty({
    description: 'Access token to be used for subsequent requests.',
  })
  accessToken: string;
}

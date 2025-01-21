import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponse {
  @ApiProperty({ description: 'Message to the user', example: 'Reset password email sent' })
  message: string;
}

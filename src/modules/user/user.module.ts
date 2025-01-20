import { Module } from '@nestjs/common';
import { UserService } from './user.repository';

@Module({
  controllers: [],
  providers: [UserService]
})
export class UserModule {}

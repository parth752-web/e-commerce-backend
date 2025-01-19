import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

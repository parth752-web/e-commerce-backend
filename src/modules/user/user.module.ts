import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseCollectionNames } from 'src/shared/enums';
import { UserSchema } from 'src/schemas/user.schema';
import { UserQueryService } from './user.query.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatabaseCollectionNames.USER, schema: UserSchema }])],
  providers: [UserQueryService, UserRepository],
  exports: [UserQueryService],
})
export class UserModule {}

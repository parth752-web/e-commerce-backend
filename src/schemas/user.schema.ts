import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseCollectionNames } from '../shared/enums';
import { Identifier } from '../shared/types';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.USER,
})
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '643405452324db8c464c0584',
  })
  @Expose()
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id?: Types.ObjectId;

  // email is the unique identifier of the user
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'john@example.com',
  })
  @Expose()
  @Prop({
    required: true,
  })
  email: string;

  // password is the hashed password of the user
  @ApiHideProperty()
  @Exclude()
  @Prop()
  password?: string;

  // name is the full name of the user
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Expose()
  @Prop()
  name?: string;

  // mobile is the mobile number of the user
  @ApiProperty({
    description: 'The mobile number of the user',
    example: '919898989898',
  })
  @Expose()
  @Prop({
    type: MongooseSchema.Types.String,
  })
  mobile?: string;

  @ApiHideProperty()
  @Exclude()
  @Prop()
  resetToken?: string;

  // registerCode is used for when user is going to reset password or change password perform at time all same user login session will be logout
  @ApiHideProperty()
  @Exclude()
  @Prop({
    type: MongooseSchema.Types.Number,
  })
  registerCode?: number;

  @ApiProperty({
    description: 'Date of creation',
  })
  @Prop()
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of last update',
  })
  @Prop()
  @Expose()
  updatedAt?: Date;
}

export type UserIdentifier = Identifier | User;

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, isActive: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ mobile: 1 });

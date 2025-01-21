import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseCollectionNames } from '../shared/enums';
import { Identifier } from '../shared/types';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsEmail, MinLength, MaxLength, Matches, IsDate, IsNumber } from 'class-validator';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.USER,
})
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '643405452324db8c464c0584',
  })
  @IsMongoId()
  @IsOptional()
  @Expose()
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id?: Types.ObjectId;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  @Expose()
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @Exclude()
  @Prop({
    required: false,
  })
  password?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' })
  @Expose()
  @Prop({
    trim: true,
  })
  name?: string;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '919898989898',
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{10,15}$/, { message: 'Please provide a valid mobile number' })
  @Expose()
  @Prop({
    type: MongooseSchema.Types.String,
    trim: true,
  })
  mobile?: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  @Exclude()
  @Prop({
    type: MongooseSchema.Types.String,
  })
  resetToken?: string;

  @ApiProperty({
    description: 'Date of creation',
  })
  @IsDate()
  @IsOptional()
  @Prop()
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of last update',
  })
  @IsDate()
  @IsOptional()
  @Prop()
  @Expose()
  updatedAt?: Date;
}

export type UserIdentifier = Identifier | User;

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

// Add compound index for email and isActive
UserSchema.index({ email: 1 });
// Add unique index for email
UserSchema.index({ email: 1 }, { unique: true });
// Add index for mobile
UserSchema.index({ mobile: 1 }, { sparse: true });

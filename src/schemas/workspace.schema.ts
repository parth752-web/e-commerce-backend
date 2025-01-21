import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DatabaseCollectionNames } from '../shared/enums';
import { Identifier } from '../shared/types';
import { UserIdentifier } from './user.schema';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Schema({ timestamps: true, collection: DatabaseCollectionNames.WORKSPACE })
export class Workspace {
  @ApiProperty({
    description: 'The unique identifier of the workspace',
    example: '507f191e810c19729de860ea',
  })
  @Expose()
  @IsMongoId()
  @IsOptional()
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id?: Types.ObjectId;

  @ApiProperty({
    description: 'The name of the workspace',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'UserId of the user who created the workspace',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DatabaseCollectionNames.USER })
  createdBy: UserIdentifier;

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
  @IsOptional()
  @IsDate()
  @Prop()
  @Expose()
  updatedAt?: Date;
}

export type WorkspaceIdentifier = Identifier | Workspace;

export type WorkspaceDocument = HydratedDocument<Workspace>;
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

WorkspaceSchema.index({ createdBy: 1 });

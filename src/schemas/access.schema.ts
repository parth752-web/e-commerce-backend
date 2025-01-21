import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserIdentifier } from './user.schema';
import { WorkspaceIdentifier } from './workspace.schema';
import { DatabaseCollectionNames } from '../shared/enums';
import { AccessRoles } from '../enums/access.enum';
import { Identifier } from '../shared/types';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.ACCESS,
})
export class Access {
  @ApiProperty({
    description: 'The id of the access document:- accessId',
    example: '5bf142459b72e12b2b1b2cd',
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
    description: 'The id of the user:- userId',
    example: '64397da0076badf5dfe711b1',
  })
  @IsMongoId()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: DatabaseCollectionNames.USER })
  user: UserIdentifier;

  @ApiProperty({
    description: 'The workspaces the user has access to workspaceId',
    example: '64397b25365275b5767fc557',
  })
  @IsMongoId()
  @IsOptional()
  @Expose()
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: DatabaseCollectionNames.WORKSPACE,
  })
  workspaces?: WorkspaceIdentifier;

  @IsEnum(AccessRoles)
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: `The roles the user`,
    example: {
      '64397b16545230ad2f836d84': AccessRoles.OWNER,
      '64397bb78fc60ce197238886': AccessRoles.USER,
    },
  })
  @Prop({
    type: MongooseSchema.Types.String,
  })
  roles?: AccessRoles;
}

export type AccessIdentifier = Identifier | string;

export type AccessDocument = HydratedDocument<Access>;
export const AccessSchema = SchemaFactory.createForClass(Access);

AccessSchema.index({ user: 1 });

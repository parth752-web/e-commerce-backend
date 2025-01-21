import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Access, AccessDocument } from '../../schemas/access.schema';
import { DatabaseCollectionNames } from '../../shared/enums';

@Injectable()
export class AccessRepository {
  constructor(@InjectModel(DatabaseCollectionNames.ACCESS) private accessModel: Model<AccessDocument>) {}

  async findOne(filter: FilterQuery<AccessDocument>): Promise<Access | null> {
    return this.accessModel.findOne(filter).lean();
  }
}

import { Injectable } from '@nestjs/common';
import { Identifier } from '../../shared/types';
import { AccessRepository } from './access.repository';
import { InternalServerErrorException } from '../../exceptions';

@Injectable()
export class AccessQueryService {
  constructor(private readonly accessRepository: AccessRepository) {}

  async getUserFullAccess(userId: Identifier) {
    const filter = {
      user: userId,
    };

    try {
      const access = await this.accessRepository.findOne(filter);
      return access;
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }
}

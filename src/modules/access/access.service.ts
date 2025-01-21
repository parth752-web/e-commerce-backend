import { Injectable } from '@nestjs/common';
import { AccessQueryService } from './access.query.service';
import { Identifier } from '../../shared/types';

@Injectable()
export class AccessService {
  constructor(private readonly accessQueryService: AccessQueryService) {}
  async getFullAccess(userId: Identifier) {
    return this.accessQueryService.getUserFullAccess(userId);
  }
}

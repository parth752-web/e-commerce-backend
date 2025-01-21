import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepository: UserRepository) {}

  
}

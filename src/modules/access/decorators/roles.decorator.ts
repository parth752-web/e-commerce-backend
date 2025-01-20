import { SetMetadata } from '@nestjs/common';
import { AccessRoles } from '../../../enums/access.enum';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: AccessRoles[]) => SetMetadata(ROLES_KEY, roles);

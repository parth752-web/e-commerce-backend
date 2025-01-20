import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessRoles } from '../../../enums/access.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CustomHeaders } from '../../../shared/enums/req-headers.enum';
import { ForbiddenException } from '../../../exceptions';
import { Access } from '../../../schemas/access.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AccessRoles[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const workspaceId = request.headers[CustomHeaders.WORKSPACE_ID];

    if (!workspaceId) {
      return true;
    }

    const { access }: { access: Access } = request.user;

    const role = access.roles;

    if (!role) {
      throw ForbiddenException.MISSING_PERMISSIONS('You are not a member of workspace');
    }

    const hasRole = roles.includes(role);

    if (!hasRole) {
      throw ForbiddenException.MISSING_PERMISSIONS('You do not have permission to perform this action');
    }
  }
}

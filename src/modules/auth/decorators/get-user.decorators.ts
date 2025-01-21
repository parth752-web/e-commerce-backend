import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserDocument => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.info;
});

import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtUserAuthGuard } from '../auth/guards/jwt-user-auth.guard';
import { Access } from 'src/schemas/access.schema';
import { GetUser } from '../auth/decorators/get-user.decorators';
import { UserDocument } from 'src/schemas/user.schema';
import { AccessService } from './access.service';

@ApiBearerAuth()
@ApiTags('Access')
@UseGuards(JwtUserAuthGuard)
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @HttpCode(200)
  @ApiOkResponse({ type: Access })
  @Get('me')
  async getFullAccess(@GetUser() user: UserDocument): Promise<Access> {
    return this.accessService.getFullAccess(user._id);
  }
}

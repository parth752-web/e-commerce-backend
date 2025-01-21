import { Controller } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '../../exceptions';
import { AuthService } from './auth.service';

@ApiBadRequestResponse({ type: BadRequestException })
@ApiInternalServerErrorResponse({ type: InternalServerErrorException })
@ApiUnauthorizedResponse({ type: UnauthorizedException })
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}

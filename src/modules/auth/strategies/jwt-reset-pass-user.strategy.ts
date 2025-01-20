// import * as crypto from 'crypto'; // Used to generate reset password tokens
// import { ConfigService } from '@nestjs/config';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// import { AccessQueryService } from '../../access/access.query.service';
// import { JwtResetPassUserPayload } from '../interfaces/jwt-user-payload.interface';
// import { UnauthorizedException } from '../../../exceptions/unauthorized.exception';
// import { UserQueryService } from '../../user/user.query.service';

// @Injectable()
// export class JwtResetPassUserStrategy extends PassportStrategy(Strategy, 'authResetPassUser') {
//   constructor(private readonly configService: ConfigService, private readonly userQueryService: UserQueryService, private readonly accessQueryService: AccessQueryService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get('jwt.publicKey'),
//     });
//   }

//   async validate(payload: JwtResetPassUserPayload) {
//     const user = await this.userQueryService.findById(payload.identifier);
//     if (!user) {
//       throw UnauthorizedException.UNAUTHORIZED_ACCESS();
//     }
//     const hashedToken = crypto.createHash('sha256').update(payload.token).digest('hex');

//     if (hashedToken !== user.resetToken) {
//       throw UnauthorizedException.INVALID_RESET_PASSWORD_TOKEN();
//     }

//     const access = await this.accessQueryService.getUserById(user._id);
//     return {
//       info: user,
//       access,
//     };
//   }
// }

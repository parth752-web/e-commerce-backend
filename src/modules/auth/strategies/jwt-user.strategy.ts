// import { ConfigService } from '@nestjs/config';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// import { AccessQueryService } from '../../access/access.query.service';
// import { JwtUserPayload } from '../interfaces/jwt-user-payload.interface';
// import { UnauthorizedException } from '../../../exceptions/unauthorized.exception';
// import { UserQueryService } from '../../user/user.query.service';

// @Injectable()
// export class JwtUserStrategy extends PassportStrategy(Strategy, 'authUser') {
//   constructor(private readonly configService: ConfigService, private readonly userQueryService: UserQueryService, private readonly accessQueryService: AccessQueryService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: configService.get('jwt.publicKey'),
//     });
//   }

//   async validate(payload: JwtUserPayload) {
//     const user = await this.userQueryService.findById(payload.user);
//     if (!user) {
//       throw UnauthorizedException.UNAUTHORIZED_ACCESS();
//     }
//     if (!user.verified) {
//       throw UnauthorizedException.USER_NOT_VERIFIED();
//     }
//     if (payload.code !== user.registerCode) {
//       throw UnauthorizedException.REQUIRED_RE_AUTHENTICATION();
//     }
//     const access = await this.accessQueryService.getUserById(user._id);
//     return { info: user, access };
//   }
// }

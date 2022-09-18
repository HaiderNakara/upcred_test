// import { Injectable } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly appService: AuthService) {
//     super({
//       secretOrKey: 'lol',
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       passReqToCallBack: true,
//     });
//   }

//   async validate(req: Request, payload: { sub: string }) {
//     console.log(payload);
//     console.log(req);
//     console.log(payload);

//     // console.log(context.getClass());

//     // const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//     //   context.getHandler(),
//     //   context.getClass(),
//     // ]);
//     // console.log(this.reflector);
//     // console.log(payload);

//     // console.log(request);

//     // const { userId } = payload;
//     // const user: User = await this.appService.findByUserId(userId);
//     // if (!user) throw new UnauthorizedException();
//     // return user;
//     // if (!requireRoles) return user;
//     // if (requireRoles.some((role => user.roles.includes(role))) return user;
//     // throw new UnauthorizedException();
//     // }
//   }
// }

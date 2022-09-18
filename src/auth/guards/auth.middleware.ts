import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appService: AuthService,
  ) { }
  async canActivate(context: ExecutionContext) {
    try {
      const req: Request = context.switchToHttp().getRequest();
      if (req.headers.authorization && req.headers.authorization.length > 7) {
        const jwt = req.headers.authorization.split(' ')[1];
        const payload = await this.jwtService.verifyAsync(jwt);
        if (!payload) {
          return false;
        }
        const { userId } = payload;
        const user: Auth = await this.appService.findByUserId(userId);
        if (!user) return false;
        req['user'] = user;
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

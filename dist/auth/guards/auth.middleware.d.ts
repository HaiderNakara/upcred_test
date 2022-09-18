import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
export declare class RolesGuard implements CanActivate {
    private readonly jwtService;
    private readonly appService;
    constructor(jwtService: JwtService, appService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

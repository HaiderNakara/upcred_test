import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthController {
    private readonly appService;
    constructor(appService: AuthService);
    signup(createAuthDto: UpdateAuthDto): Promise<import("@nestjs/common").BadRequestException | {
        accessToken: string;
    }>;
    login(data: UpdateAuthDto): Promise<{
        accessToken: string;
    }>;
}

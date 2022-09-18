import {
  Body, Controller, Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) { }
  @Post('/signup')
  async signup(
    @Body() createAuthDto: UpdateAuthDto,
  ) {
    return await this.appService.signup(createAuthDto);
  }
  @Post('/login')
  async login(@Body() data: UpdateAuthDto) {
    return await this.appService.login(data.email, data.password);
  }
}

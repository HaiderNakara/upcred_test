import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './entities/auth.entity';
import { RolesGuard } from './guards/auth.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
  exports: [PassportModule, AuthService, JwtModule, MongooseModule],
})
export class AuthModule { }

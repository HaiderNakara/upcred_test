import { PartialType } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';

export class UpdateAuthDto extends PartialType(Auth) { }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  userId: String;
  @ApiProperty()
  @IsEmail()
  @Prop()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @Prop()
  password: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);

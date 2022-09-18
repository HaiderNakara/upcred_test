import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;
@Schema()
export class Contact {
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  email: string;
  @ApiProperty()
  @Prop()
  phone: string;
  @ApiProperty()
  @Prop()
  address: string;
  @ApiProperty()
  @Prop()
  description: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
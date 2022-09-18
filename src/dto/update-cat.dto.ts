import { PartialType } from "@nestjs/swagger";
import { Contact } from "src/entities/app.entity";

export class UpdateContactDto extends PartialType(Contact) { }

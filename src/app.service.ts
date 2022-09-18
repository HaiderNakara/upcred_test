import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateContactDto } from './dto/update-cat.dto';
import { Contact } from './entities/app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Contact.name) private readonly catModel: Model<Contact>,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }
  async getContacts(page: number, search: string): Promise<Contact[]> {
    if (search && page) {
      return await this.catModel.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }).skip(page * 10).limit(10).exec();
    }
    if (search) {
      return await this.catModel.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }).exec();
    }
    if (page) {
      return await this.catModel.find().skip(page * 10).limit(10).exec();
    }
    return await this.catModel.find().exec();
  }
  async getContact(id: string) {
    const contact = await this.catModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException('Id not found');
    }
    return contact;
  }
  async addContact(contact: Contact): Promise<Contact> {
    const existing = await this.catModel.findOne({ email: contact.email }).exec();
    if (existing) {
      throw new Error('Email already exists');
    }
    const newContact = new this.catModel(contact);
    return await newContact.save();
  }
  async updateContact(id: string, contact: UpdateContactDto): Promise<Contact> {
    const existing = await this.catModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Id not found');
    }
    return await this.catModel.findByIdAndUpdate(id, contact, { new: true });
  }
  async deleteContact(id: string): Promise<Contact> {
    const existing = await this.catModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Id not found');
    }
    return await this.catModel.findByIdAndDelete(id);
  }
}

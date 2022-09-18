"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_entity_1 = require("./entities/app.entity");
let AppService = class AppService {
    constructor(catModel) {
        this.catModel = catModel;
    }
    getHello() {
        return 'Hello World!';
    }
    async getContacts(page, search) {
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
    async getContact(id) {
        const contact = await this.catModel.findById(id).exec();
        if (!contact) {
            throw new common_1.NotFoundException('Id not found');
        }
        return contact;
    }
    async addContact(contact) {
        const existing = await this.catModel.findOne({ email: contact.email }).exec();
        if (existing) {
            throw new Error('Email already exists');
        }
        const newContact = new this.catModel(contact);
        return await newContact.save();
    }
    async updateContact(id, contact) {
        const existing = await this.catModel.findById(id).exec();
        if (!existing) {
            throw new common_1.NotFoundException('Id not found');
        }
        return await this.catModel.findByIdAndUpdate(id, contact, { new: true });
    }
    async deleteContact(id) {
        const existing = await this.catModel.findById(id).exec();
        if (!existing) {
            throw new common_1.NotFoundException('Id not found');
        }
        return await this.catModel.findByIdAndDelete(id);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(app_entity_1.Contact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const auth_entity_1 = require("./entities/auth.entity");
let AuthService = class AuthService {
    constructor(authModel, jwtService) {
        this.authModel = authModel;
        this.jwtService = jwtService;
    }
    async signup(data) {
        await this.validate(data.email);
        try {
            let userId = (0, uuid_1.v4)().toString();
            const hash = await bcrypt.hash(data.password, 10);
            const auth = new this.authModel({
                password: hash,
                userId: userId,
                email: data.email,
            });
            await auth.save();
            const payload = { userId: auth.userId };
            const acessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '7d',
            });
            return {
                accessToken: acessToken,
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.BadRequestException('Invalid ');
        }
    }
    async login(email, password) {
        const user = await this.authModel.findOne({ email });
        console.log(password);
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { userId: user.userId };
            const acessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '7d',
            });
            return {
                accessToken: acessToken,
            };
        }
        else {
            throw new common_1.UnauthorizedException('Please check your login credentials');
        }
    }
    async find() {
        try {
            return await this.authModel.find().exec();
        }
        catch (error) {
            return new common_1.BadRequestException('Invalid id');
        }
    }
    async findByUserId(id) {
        try {
            return await this.authModel.findOne({ userId: id });
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid id');
        }
    }
    async validate(email) {
        const temp1 = await this.authModel.findOne({
            email,
        });
        console.log(temp1);
        if (temp1) {
            throw new common_1.BadRequestException('You are already registered');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_entity_1.Auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const auth_middleware_1 = require("./auth/guards/auth.middleware");
const update_cat_dto_1 = require("./dto/update-cat.dto");
const app_entity_1 = require("./entities/app.entity");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getContacts(page, search) {
        return this.appService.getContacts(page, search);
    }
    getContact(id) {
        return this.appService.getContact(id);
    }
    addContact(contact) {
        return this.appService.addContact(contact);
    }
    updateContact(id, contact) {
        return this.appService.updateContact(id, contact);
    }
    deleteContact(id) {
        return this.appService.deleteContact(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('contacts'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, common_1.UseGuards)(auth_middleware_1.RolesGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContacts", null);
__decorate([
    (0, common_1.Get)('contacts/:id'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseGuards)(auth_middleware_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContact", null);
__decorate([
    (0, common_1.Post)('contacts'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseGuards)(auth_middleware_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_entity_1.Contact]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addContact", null);
__decorate([
    (0, common_1.Patch)('contacts/:id'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseGuards)(auth_middleware_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cat_dto_1.UpdateContactDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Delete)('contacts/:id'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseGuards)(auth_middleware_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteContact", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map
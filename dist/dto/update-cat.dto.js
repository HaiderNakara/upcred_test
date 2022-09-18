"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const app_entity_1 = require("../entities/app.entity");
class UpdateContactDto extends (0, swagger_1.PartialType)(app_entity_1.Contact) {
}
exports.UpdateContactDto = UpdateContactDto;
//# sourceMappingURL=update-cat.dto.js.map
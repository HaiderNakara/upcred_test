"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth_entity_1 = require("../entities/auth.entity");
class UpdateAuthDto extends (0, swagger_1.PartialType)(auth_entity_1.Auth) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map
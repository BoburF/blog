"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validId = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
function validId(id) {
    const validObjectId = mongoose_1.Types.ObjectId.isValid(id);
    if (!validObjectId) {
        throw new common_1.BadRequestException('Invalid ObjectId');
    }
}
exports.validId = validId;
//# sourceMappingURL=id.validate.js.map
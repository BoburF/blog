"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthKeySchema = void 0;
const mongoose = require("mongoose");
exports.UserAuthKeySchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
});
//# sourceMappingURL=auth.schema.js.map
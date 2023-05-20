"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
    ],
}, { timestamps: true });
//# sourceMappingURL=user.schema.js.map
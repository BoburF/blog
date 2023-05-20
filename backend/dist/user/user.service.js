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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const id_validate_1 = require("../services/id.validate");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        await this.checkExists(createUserDto.email);
        createUserDto.password = await (0, bcrypt_1.hash)(createUserDto.password, 12);
        const user = await this.userModel.create(createUserDto);
        const userRes = user.toJSON({ minimize: true });
        delete userRes.password;
        return userRes;
    }
    async findAll() {
        return `This action returns all user`;
    }
    async findOne(id) {
        (0, id_validate_1.validId)(id);
        const user = await this.userModel.findById(id);
        return user;
    }
    async findOneByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        return user;
    }
    async update(id, updateUserDto) {
        (0, id_validate_1.validId)(id);
        return `This action updates a #${id} user`;
    }
    async remove(id) {
        (0, id_validate_1.validId)(id);
        return `This action removes a #${id} user`;
    }
    async checkExists(email) {
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new common_1.BadRequestException('User with this email is already exists');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
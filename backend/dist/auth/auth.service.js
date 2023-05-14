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
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userService, jwtService, authModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authModel = authModel;
    }
    async login(createAuthDto) {
        const user = await this.userService.findOneByEmail(createAuthDto.email);
        const checkPassword = await (0, bcrypt_1.compare)(createAuthDto.password, user.password);
        if (!checkPassword)
            throw new common_1.ForbiddenException('Password is incorrect');
        await this.checkTokenAndDelete(user.id);
        const payload = { email: user.email, userId: user.id };
        const refreshToken = await this.jwtService.signAsync(payload);
        await this.authModel.create({ refreshToken, userId: user.id });
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken,
        };
    }
    async register(createRegisterDto) {
        const user = await this.userService.create(createRegisterDto);
        const payload = { email: user.email, userId: user._id };
        const refreshToken = await this.jwtService.signAsync(payload);
        await this.authModel.create({ refreshToken });
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken,
        };
    }
    async checkTokenAndDelete(userId) {
        await this.authModel.findOneAndDelete({ userId });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('auth')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
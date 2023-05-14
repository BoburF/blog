import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateRegisterDto } from './dto/register-auth.dto';
import { Model } from 'mongoose';
import { AuthKey } from './schemas/auth.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    private authModel;
    constructor(userService: UserService, jwtService: JwtService, authModel: Model<AuthKey>);
    login(createAuthDto: CreateAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(createRegisterDto: CreateRegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private checkTokenAndDelete;
}

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateRegisterDto } from './dto/register-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    singIn(createAuthDto: CreateAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signUp(createRegisterDto: CreateRegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}

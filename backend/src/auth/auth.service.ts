import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateRegisterDto } from './dto/register-auth.dto';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthKey } from './schemas/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel('auth') private authModel: Model<AuthKey>,
  ) {}
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findOneByEmail(createAuthDto.email);

    const checkPassword = await compare(createAuthDto.password, user.password);

    if (!checkPassword) throw new ForbiddenException('Password is incorrect');
    await this.checkTokenAndDelete(user.id);

    const payload = { email: user.email, userId: user.id };
    const refreshToken = await this.jwtService.signAsync(payload);
    await this.authModel.create({ refreshToken, userId: user.id });
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  async register(createRegisterDto: CreateRegisterDto) {
    const user = await this.userService.create(createRegisterDto);

    const payload = { email: user.email, userId: user._id };
    const refreshToken = await this.jwtService.signAsync(payload);
    await this.authModel.create({ refreshToken });
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  private async checkTokenAndDelete(userId: string) {
    await this.authModel.findOneAndDelete({ userId });
  }
}

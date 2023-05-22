import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateRegisterDto } from './dto/register-auth.dto';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuthKey } from './schemas/auth.schema';
import { RefreshAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel('tokens') private authModel: Model<AuthKey>,
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
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    await this.authModel.create({ refreshToken });
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    const tokenFromDB = await this.authModel.findOne({
      refreshToken: refreshAuthDto.refreshToken,
    });

    if (!tokenFromDB) throw new UnauthorizedException('User is not authorized');

    let payload: null | {
      email: string;
      userId: Types.ObjectId;
      exp: number;
      ait: number;
    };

    try {
      payload = await this.jwtService.verifyAsync(refreshAuthDto.refreshToken);
    } catch (err) {
      await this.authModel.findOneAndDelete({
        refreshToken: refreshAuthDto.refreshToken,
      });
      throw new UnauthorizedException('Token is not valid');
    }

    const refreshToken = await this.jwtService.signAsync(
      {
        email: payload?.email,
        userId: payload?.userId,
      },
      {
        expiresIn: '7d',
      },
    );

    await tokenFromDB.updateOne({ $set: { refreshToken } });
    await tokenFromDB.save();

    return {
      accessToken: await this.jwtService.signAsync({ userId: payload.userId }),
      refreshToken,
    };
  }

  private async checkTokenAndDelete(userId: string) {
    await this.authModel.findOneAndDelete({ userId });
  }
}

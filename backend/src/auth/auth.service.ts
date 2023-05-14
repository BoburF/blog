import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async signIn(createAuthDto: CreateAuthDto) {
    return '';
  }

  async signUp(createAuthDto: CreateAuthDto) {
    return '';
  }
}

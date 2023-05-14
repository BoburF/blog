import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { validId } from 'src/services/id.validate';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    await this.checkExists(createUserDto.email);

    createUserDto.password = await hash(createUserDto.password, 12);
    const user = await this.userModel.create(createUserDto);

    const userRes = user.toJSON({ minimize: true });

    delete userRes.password;

    return userRes;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    validId(id);
    const user = await this.userModel.findById(id);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User is not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validId(id);

    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    validId(id);

    return `This action removes a #${id} user`;
  }

  private async checkExists(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('User with this email is already exists');
    }
  }
}

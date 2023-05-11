import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { validId } from 'src/services/id.validate';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    await this.checkExists(createUserDto.email);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userModel.create(createUserDto);

    await user.save();
    user.$ignore('password');
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    validId(id);

    return await this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    validId(id);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    validId(id);
    return `This action removes a #${id} user`;
  }

  async checkExists(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('User with this email is already exists');
    }
  }
}

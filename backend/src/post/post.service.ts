import { Injectable, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Injectable()
export class PostService {
  constructor(@InjectModel('posts') private postModel: Model<Post>) {}
  async create(
    createPostDto: CreatePostDto,
    userInfo: { email: string; userId: string; iat: number; exp: number },
  ) {
    const user = userInfo;
    const post = await this.postModel.create({
      ...createPostDto,
      userId: user.userId,
    });

    await post.save();
    return post;
  }

  async findAll() {
    return await this.postModel.find();
  }

  async findOne(id: string) {
    return await this.postModel.findById(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    return `This action removes a #${id} post`;
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthKeySchema } from './schemas/auth.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
    MongooseModule.forFeature([{ name: 'tokens', schema: UserAuthKeySchema }]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

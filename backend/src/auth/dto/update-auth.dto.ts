import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  refreshToken: string;
}

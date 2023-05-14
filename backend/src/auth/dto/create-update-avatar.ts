import { IsNotEmpty, IsBase64 } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsBase64()
  img;
}

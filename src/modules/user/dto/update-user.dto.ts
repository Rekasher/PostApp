import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'name is required' })
  name?: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: "it's not email format" })
  email?: string;
}

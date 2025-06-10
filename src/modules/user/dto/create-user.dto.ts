import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @Length(8, 50, { message: 'Password must be at least 8 characters' })
  password: string;
}

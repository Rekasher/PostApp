import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {

  @IsNotEmpty({message: 'name is required'})
  name: string;

  @IsNotEmpty({message: 'email is required'})
  @IsEmail({}, {message: 'email is required'})
  email: string;

  @IsNotEmpty({message: 'password is required'})
  @Length(8, 20, { message: 'Password must be at least 8 characters' })
  password: string;
}

export class SignInDto {

  @IsNotEmpty({message: 'email is required'})
  @IsEmail({}, {message: 'email is required'})
  email: string;

  @IsNotEmpty({message: 'password is required'})
  @Length(8, 20, { message: 'Password must be at least 8 characters' })
  password: string;
}

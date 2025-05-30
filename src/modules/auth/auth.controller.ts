import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() body: SignInDto) {
    try {
      return await this.authService.signIn(body);
    }catch(error) {
      throw new BadRequestException('Not valid data', error);
    }
  }

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      return await this.authService.signUp(signUpDto);
    }catch(error) {
      throw new BadRequestException('Not valid data', error);
    }
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
  }
}

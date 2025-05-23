import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  SignUp() {
    return this.authService.SignUp();
  }

  @Post()
  signIn() {
    return this.authService.SignIn();
  }
}

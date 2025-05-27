import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Req() req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }

    return this.authService.signIn(user);
  }

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return req.logout();
  }
}

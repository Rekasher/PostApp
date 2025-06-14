import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ email, name, password }): Promise<any> {
    const existingProfile = await this.userService.findByAttributes({
      email,
      name,
    });
    if (existingProfile) {
      throw new ConflictException('User already exists');
    }

    await this.userService.create({ email, name, password });

    return {
      success: true,
      message: 'User successfully created.',
    };
  }

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.userService.findByAttributes({ email });
    if (!user)
      throw new UnauthorizedException({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException({ message: 'Invalid email or password' });

    const payload = {
      user_id: user.id,
      user_name: user.user_name,
      user_email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

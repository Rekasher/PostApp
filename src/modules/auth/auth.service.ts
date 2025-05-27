import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp({ email, name, password }): Promise<any> {
    const existingUserEmail = await this.userService.findByEmail(email);
    if (existingUserEmail) {
      throw new ConflictException('User already exists');
    }

    const existingUserName = await this.userService.findByName(name);
    if (existingUserName) {
      throw new ConflictException('User already exists');
    }

    if (password.length < 8) {
      throw new BadRequestException(
        'Password must contain at least 8 characters ',
      );
    }

    return await this.userService.create({ email, name, password });
  }

  async signIn(user: Users) {
    const payload = {
      user_id: user.id,
      user_name: user.user_name,
      user_email: user.email,
      role: user.roles.role_name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const { password: _, ...result } = user;
    return result;
  }
}

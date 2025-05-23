import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  SignUp() {
    return 'This action adds a new auth';
  }

  SignIn() {
    return `This action returns all auth`;
  }
}

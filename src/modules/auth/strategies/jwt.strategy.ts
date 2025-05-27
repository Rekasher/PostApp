import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from '../../../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET_KEY || 'secret',
    });
  }

  async validate(payload: any) {
    return {
      user_id: payload.user_id,
      user_name: payload.user_name,
      user_email: payload.user_email,
      role: payload.role,
    };
  }
}

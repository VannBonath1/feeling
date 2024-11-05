import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'admin', // Add JWT_SECRET in your env file
    });
  }

  async validate(payload: any) {
    return {
      userTestAuthId: payload.sub,
      name: payload.username,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'rachellJWT',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }

  validateToken(token: string) {
    return this.jwtService.decode(token);
  }

  generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}

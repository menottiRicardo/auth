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

  async validateToken(token: string) {
    try {
      const decodedToken: any = await this.jwtService.verify(token);
      if (!decodedToken) {
        return false;
      }
      return this.jwtService.decode(token);
    } catch (error) {
      return false;
    }
  }

  generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}

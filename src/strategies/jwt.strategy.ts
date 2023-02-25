import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AppService } from 'src/app.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'rachellJWT',
    });
  }

  async validate(payload: any) {
    const user = this.authService.validateUser(payload.email);
    return user;
  }
}

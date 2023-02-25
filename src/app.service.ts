import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtStrategy,
  ) {}
  async validateUser(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  generateToken(user: Prisma.UserSelect) {
    const payload = { sub: user.id, email: user.email };

    return { access_token: this.jwtService.generateToken(payload) };
  }
}

import { Injectable } from '@nestjs/common/decorators';
import { Logger } from '@nestjs/common/services/logger.service';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AppService } from './app.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);
  constructor(private appService: AppService) {
    super({
      secret: 'rachell', //move to env
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: 'http://localhost:3001/login/callback',
      sendMagicLink: async (destination: string, href: string) => {
        // send email
        this.logger.debug(`sending email to ${destination} with link ${href}`);
      },
      verify: async (payload: any, callback: any) =>
        callback(null, this.validate(payload)),
    });
  }

  validate(payload: { destination: string }) {
    const user = this.appService.validateUser(payload.destination);

    return user;
  }
}

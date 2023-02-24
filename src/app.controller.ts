import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MagicLoginStrategy } from './magicLogin.strategy';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private strategy: MagicLoginStrategy,
  ) {}

  // post auth/login {email} ---> send magic link
  @Post('login')
  async login(@Req() req: any, @Res() res: any, @Body() body: { destination: string }) {
    await this.appService.validateUser(body.destination);
    return this.strategy.send(req, res);
  }

  // GET auth/login/callback
}

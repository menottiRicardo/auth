import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AppService } from './app.service';
import { PasswordLessDto } from './dtos/passwordLess.dto';
import { MagicLoginStrategy } from './strategies/magicLogin.strategy';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private strategy: MagicLoginStrategy,
  ) {}

  // post auth/login {email} ---> send magic link
  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: any,
    @Body(new ValidationPipe()) body: PasswordLessDto,
  ) {
    await this.appService.validateUser(body.destination);
    return this.strategy.send(req, res);
  }

  // GET auth/login/callback
  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  async callback(@Req() req: any) {
    return this.appService.generateToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  protected(@Req() req: any) {
    return req.user;
  }
}

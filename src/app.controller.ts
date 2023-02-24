import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signup')
  getHello(@Body() data: Prisma.UserCreateInput) {
    return this.appService.signUp(data.username);
  }
}

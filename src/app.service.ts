import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  signUp(username: string) {
    const newUser = this.prisma.user.create({
      data: {
        username,
      },
    });
    return newUser;
  }
}

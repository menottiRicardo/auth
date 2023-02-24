import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  signUp(user: CreateUserDto) {
    const newUser = this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return newUser;
  }

  findOneByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

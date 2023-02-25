import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MagicLoginStrategy } from './strategies/magicLogin.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'rachellJWT',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MagicLoginStrategy, JwtStrategy],
})
export class AppModule {}

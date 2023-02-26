import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MagicLoginStrategy } from './strategies/magicLogin.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './rmq/rmq.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: 'rachellJWT',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService, MagicLoginStrategy, JwtStrategy],
})
export class AppModule {}

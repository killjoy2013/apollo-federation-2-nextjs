import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entitites/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth-service';
import { TokenController } from './controllers/token/token.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS512',
      },
    }),
  ],

  providers: [AuthService, LocalStrategy, UserService],
  exports: [UserModule],
  controllers: [TokenController],
})
export class AuthModule {}

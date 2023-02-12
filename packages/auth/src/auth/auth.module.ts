import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entitites/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth-service';

import { AppController } from './controllers/app.controller';
import { JwtConfigFactory } from './factories/jwt-config.factory';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      useClass: JwtConfigFactory,
      inject: [JwtConfigFactory],
    }),
  ],

  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    JwtConfigFactory,
  ],
  exports: [UserModule],
  controllers: [AppController],
})
export class AuthModule {}

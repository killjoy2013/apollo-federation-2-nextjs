import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entitites/user.entity';

import { UserService } from 'src/user/user.service';
import { JwtConfig } from '../interfaces/jwt-config.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configservice: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    if (!username || !password) {
      return null;
    }

    const user = await this.userService.findOne(username);

    if (user && user.roles && user.roles.length > 0) {
      return user;
    }

    return null;
  }

  login(user: User): { access_token: string } {
    const rights = [];
    user.roles.forEach((role) =>
      role.rights.forEach((right) => rights.push(right.name)),
    );
    const jwtConfig = this.configservice.get<JwtConfig>('jwt');
    const tokenData = {
      rights,
      username: user.userName,
      sub: user.id,
      iss: jwtConfig.iss,
    };
    return {
      access_token: this.jwtService.sign(tokenData),
    };
  }
}

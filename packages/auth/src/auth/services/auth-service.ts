import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entitites/user.entity';

import { UserService } from 'src/user/user.service';
import { LoginUserInput } from '../dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    if (!username || !password) {
      return null;
    }

    const user = await this.userService.findOne(username);

    if (user) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const rights = [];
    user.roles.forEach((role) =>
      role.rights.forEach((right) => rights.push(right.name)),
    );

    return {
      access_token: this.jwtService.sign({
        username: user.userName,
        sub: user.id,
      }),
      rights,
    };
  }
}

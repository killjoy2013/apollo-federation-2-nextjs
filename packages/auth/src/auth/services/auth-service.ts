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

  async validateUser(username: string, password: string): Promise<any> {
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
    return {
      access_token: this.jwtService.sign({
        username: user.userName,
        sub: user.id,
      }),
      user,
    };
  }
}

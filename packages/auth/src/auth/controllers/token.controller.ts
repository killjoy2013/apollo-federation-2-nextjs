import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/auth/interfaces/jwt-config.interface';
import { AuthService } from 'src/auth/services/auth-service';

@Controller('token')
export class TokenController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post()
  async generateToken(@Body() { username, password }) {
    const user = await this.authService.validateUser(username, password);

    if (!user || !user.roles || user.roles.length === 0) return null;

    const rights = [];
    user.roles.forEach((role) =>
      role.rights.forEach((right) => rights.push(right.name)),
    );

    const jwtConfig = this.configService.get<JwtConfig>('jwt');

    const tokenData = {
      rights,
      username: user.userName,
      sub: user.id,
      iss: jwtConfig.iss,
    };

    return {
      accessToken: this.jwtService.sign(tokenData),
    };

    // return {
    //   access_token: this.jwtService.sign({
    //     rights,
    //     username: user.userName,
    //     sub: user.id,
    //     algorithms: ['HS512'],
    //   }),
    // };
  }
}

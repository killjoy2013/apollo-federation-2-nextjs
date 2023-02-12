import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import rsaPemToJwk from 'rsa-pem-to-jwk';
import { Request } from 'express';
import { User } from 'src/user/entitites/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Csrf } from '../interfaces/csrf.interface';
import { JwtConfig } from '../interfaces/jwt-config.interface';
import { AuthService } from '../services/auth-service';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get()
  healthCheck() {
    return 'Ok';
  }

  /***
   * If csrf protection is enabled in backend, this endpoint returns CSRF token, that needs to be applied in one of below places to non GET and non OPTIONS requests.
   * CSRF token can be applied to request in following places: <br>
   * - body._csrf<br>
   * - query._csrf<br>
   * - headers['csrf-token']<br>
   * - headers['xsrf-token']<br>
   * - headers['x-csrf-token']<br>
   * - headers['x-xsrf-token']<br>
   * @param request
   */
  @Get('csrfToken')
  csrfToken(@Req() request) {
    const csrf = this.configService.get<Csrf>('csrf');

    if (csrf.enabled) {
      return { token: request.csrfToken() };
    }

    return {};
  }

  @Get('.well-known/jwks.json')
  getJwks() {
    const { kid, privateKey, algorithm } =
      this.configService.get<JwtConfig>('jwt');

    const key = rsaPemToJwk(
      privateKey,
      { use: 'sig', kid, alg: algorithm },
      'public',
    );

    return {
      keys: [key],
    };
  }

  @Post('auth/token')
  @UseGuards(LocalAuthGuard)
  async generateToken(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }
}

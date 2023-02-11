import { Controller, Get, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import rsaPemToJwk from 'rsa-pem-to-jwk';
import { Csrf } from '../interfaces/csrf.interface';
import { JwtConfig } from '../interfaces/jwt-config.interface';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

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
    const csrf = this.config.get<Csrf>('csrf');

    if (csrf.enabled) {
      return { token: request.csrfToken() };
    }

    return {};
  }

  @Get('.well-known/jwks.json')
  getJwks() {
    const { kid, privateKey } = this.config.get<JwtConfig>('jwt');

    const key = rsaPemToJwk(privateKey, { use: 'sig', kid }, 'public');

    return {
      keys: [key],
    };
  }
}

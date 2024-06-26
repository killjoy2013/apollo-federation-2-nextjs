import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'src/user/entitites/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Csrf } from '../interfaces/csrf.interface';
import { JwtConfig } from '../interfaces/jwt-config.interface';
import { AuthService } from '../services/auth-service';

const priv = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

const pubb = `-----BEGIN PUBLIC KEY-----
MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAr/kIbUEgL9OQImLd+OYz
lm/F6iUt0fyNlrf4ciGusahtKTAMctBPpFxUdNAniiR3sNcIpHvow8tCXbYNOP5+
YChz9+8g/LRacjI+PcHIZvfkcKz81z+hUPZO1RXs5eYUjraQ8G8ccDvIYG66STh5
a24jp0c1cyEtzelCLdjxkgCw81zbN64LKEE53hs2pjQ91aiIrZlZ3LUgtclVQ3aX
oOBk7jPDa/JI6oN1B5xl6eU0T1kLRlDXSIdT/lpcKP63Whd5MDU5Mtpd7gnwXZDL
oulCQnlz9jYPopF8gBrUr6AR57ZWYM4SdeXGc+6XnfxyntbTbliL5pm5jZiHrUpA
PZ4E4Lp2rZ99kU3iBrxT3ozqVfivAyAViY2hvnWCuhkpjiyyM5Ji5qSoLlAq27If
7ss5XkYTLFkT7XlXwQ4QeH1AvP0hAvBTxi8pStreqCAWghtBCM5WkdEmg7D2PQLY
ujBvjce7n/8N6sPx70oUDdmN9nKBuOmfBi9dv7vtvoFtAgMBAAE=
-----END PUBLIC KEY-----`;

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
    const { jwk } = this.configService.get<JwtConfig>('jwt');

    const key = JSON.parse(jwk);

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

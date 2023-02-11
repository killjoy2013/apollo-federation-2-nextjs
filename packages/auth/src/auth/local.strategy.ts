import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth-service';
import { ExtractJwt } from 'passport-jwt';
import { JwtConfigFactory } from './factories/jwt-config.factory';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtFactory: JwtConfigFactory,
  ) {
    const jwtOptions = jwtFactory.createJwtOptions();

    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtOptions.publicKey,
      algorithm: jwtOptions.signOptions.algorithm,
    };

    super(options);
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

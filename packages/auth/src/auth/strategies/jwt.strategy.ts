import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { JwtConfigFactory } from '../factories/jwt-config.factory';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly authConfigFactory: JwtConfigFactory,
  ) {
    const jwtOptions = authConfigFactory.createJwtOptions();

    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.publicKey,
      algorithm: jwtOptions.signOptions.algorithm,
    };

    super(options);
  }

  async validate(payload: { username: string }) {
    return await this.userService.findOne(payload.username);
  }
}

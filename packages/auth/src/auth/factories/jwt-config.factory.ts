import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtConfig } from '../interfaces/jwt-config.interface';

@Injectable()
export class JwtConfigFactory {
  private jwtConfig: JwtConfig;

  constructor(private configService: ConfigService) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
  }

  createJwtOptions(): JwtModuleOptions {
    const { pk8Key, privateKey, publicKey, expiration, algorithm, kid } =
      this.jwtConfig;
    return {
      publicKey,
      privateKey,
      signOptions: {
        keyid: kid,
        algorithm,
        expiresIn: expiration,
      },
    };
  }
}

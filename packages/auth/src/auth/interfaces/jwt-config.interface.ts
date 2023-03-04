import { Algorithm } from 'jsonwebtoken';

export interface JwtConfig {
  expiration: string;
  pk8Key?: string;
  privateKey?: string;
  publicKey?: string;
  jwk?: string;
  algorithm?: Algorithm;

  kid: string;
  iss: string;
}

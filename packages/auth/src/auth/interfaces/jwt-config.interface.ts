import { Algorithm } from 'jsonwebtoken';

export interface JwtConfig {
  expiration: string;
  pk8Key?: string;
  privateKey?: string;
  publicKey?: string;
  algorithm?: Algorithm;
  secret: string;
  kid: string;
  iss: string;
}

import { Algorithm } from 'jsonwebtoken';

export interface JwtConfig {
  expiration: string;
  privateKeyPath?: string;
  publicKeyPath?: string;
  privateKey?: string;
  publicKey?: string;
  algorithm?: Algorithm;
  secret: string;
  kid: string;
  iss: string;
}

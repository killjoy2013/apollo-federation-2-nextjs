const PORT = process.env.PORT || 4001;
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.useGlobalPipes(new ValidationPipe());

  server.use(
    cors({
      credentials: true,
      origin: '*',
    }),
  );

  server.use(cookieParser());

  server.use((req, res, next) => {
    let secureTag = '';
    if (process.env.NODE_ENV != 'development') {
      secureTag = '__Secure-';
    }
    let decodedToken;
    const httpsCookie = req.cookies?.[`${secureTag}next-auth.session-token`];
    const httpCookie = req.cookies?.[`next-auth.session-token`];
    const authorizationHeader = req.headers['authorization'];
    const authorizationHeaderToken = authorizationHeader
      ? authorizationHeader.replace('Bearer', '').trim()
      : undefined;
    const token = httpsCookie
      ? httpsCookie
      : httpCookie ?? authorizationHeaderToken;
    const client = jwksClient({
      jwksUri: 'http://localhost:3100/.well-known/jwks.json',
    });
    function getKey(header, callback) {
      client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    }
    function addClaims(req, decodedToken) {
      const { iat, exp, iss, ...claims } = decodedToken;
      const claimEntries = Object.entries(claims);
      claimEntries.forEach((entry) => (req.headers[entry[0]] = entry[1]));
    }
    jsonwebtoken.verify(
      token,
      getKey,
      { algorithms: ['RS256'] },
      (err, decoded) => {
        if (!!err) {
          throw new UnauthorizedException();
        }
        decodedToken = decoded;
        addClaims(req, decodedToken);
        return next();
      },
    );
  });

  server.use(express.json());

  await app.listen(PORT);

  console.log(`gateway is on ${PORT}`);
}
bootstrap();

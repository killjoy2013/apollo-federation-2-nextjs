import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt';
import axios from 'axios';
import Credentials from 'next-auth/providers/credentials';

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

async function authAndCreateUser(username: string, password: string) {
  const resp = await axios.post(
    'http://localhost:3100/auth/token',
    {
      username,
      password,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const tokenData = jsonwebtoken.decode(resp.data.access_token) as JwtPayload;

  return {
    username: tokenData.username,
    id: tokenData.sub,
    sub: tokenData.sub,
    rights: tokenData.rights,
    iat: tokenData.iat,
    exp: tokenData.exp,
    iss: tokenData.iss,
  };
}

// async function refreshToken(oldToken: JWT): Promise<any> {
//   return new Promise(async (resolve, reject) => {
//     const username = oldToken.username as string;

//     console.log(
//       `${username} token will refresh on ${new Date().toLocaleTimeString()}`,
//     );

//     try {
//       const user = await prisma.user.findFirst({
//         where: {
//           username,
//         },
//       });

//       if (!user || !user.refreshToken) {
//         signOut();
//         reject(`${username} not found or refresh token is empty!`);
//       }

//       jsonwebtoken.verify(user.refreshToken, process.env.TOKEN_SECRET) as JWT;

//       // eslint-disable-next-line unused-imports/no-unused-vars
//       const { iat, exp, ...others } = oldToken;

//       const rights = await getRights(user.username);

//       const newToken = {
//         ...others,
//         rights,
//         accessTokenExpires:
//           Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
//       };

//       const newRefreshToken = jsonwebtoken.sign(
//         newToken,
//         process.env.TOKEN_SECRET,
//         {
//           expiresIn: parseInt(process.env.TOKEN_MAX_AGE),
//           algorithm: 'HS512',
//         },
//       );

//       await prisma.user.update({
//         where: {
//           username,
//         },
//         data: {
//           refreshToken: newRefreshToken,
//         },
//       });

//       resolve(newToken);
//     } catch (error) {
//       console.log(error);
//       reject(error);
//     }
//   });
// }

export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
    encode: async (params: JWTEncodeParams): Promise<string> => {
      const { token } = params;

      let encodedToken = '';
      if (token) {
        encodedToken = jsonwebtoken.sign(token, privateKey, {
          algorithm: 'RS256',
        });
      } else {
        console.log('TOKEN EMPTY. SO, LOGOUT!...');
        return '';
      }

      return encodedToken;
    },
    decode: async (params: JWTDecodeParams) => {
      const { token } = params;
      const decoded = jsonwebtoken.decode(token);

      return { ...(decoded as JWT) };
    },
  },

  callbacks: {
    async session({ session, token }) {
      const newSession = {
        expires: '',
        rights: token.rights,
        username: token.username,
        exp: token.exp,
      };

      return newSession;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { id, ...rest } = user;

        return { ...rest };
      }

      //const left = ((token.accessTokenExpires as number) - Date.now()) / 1000;

      //if (left > 0) {

      return {
        ...token,
      };
      // } else {
      //   const newToken = await refreshToken(token);

      //   return newToken;
      // }
    },
  },
  providers: [
    Credentials({
      name: 'ORDINARY_JWT',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error('enter username or password');
        }
        try {
          const user = await authAndCreateUser(username, password);

          return user;
        } catch (error) {
          console.log(error);
          throw new Error('Authentication error');
        }
      },
    }),
  ],
  events: {
    async signOut({ token }) {
      // await prisma.user.update({
      //   where: {
      //     username: token.username as string,
      //   },
      //   data: {
      //     refreshToken: null,
      //   },
      // });
    },
  },
};

export default NextAuth(authOptions);

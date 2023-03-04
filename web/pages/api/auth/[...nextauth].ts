import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt';
import axios from 'axios';
import Credentials from 'next-auth/providers/credentials';
import { encodeToken } from 'helpers/AuthHelper';

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

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    encode: async (params: JWTEncodeParams): Promise<string> => {
      const { token } = params;

      let encodedToken = '';
      if (token) {
        encodedToken = encodeToken(token);
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
        user: {
          rights: token.rights,
          username: token.username,
        },
        expires: token.exp as string,
      };

      return newSession;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { id, ...rest } = user;

        return { ...rest };
      }

      return {
        ...token,
      };
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
      console.log(token);
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

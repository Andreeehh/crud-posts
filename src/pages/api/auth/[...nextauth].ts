import { gqlClient } from 'graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from 'graphql/mutations/auth';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

type NextAuthSession = {
  jwt: string;
  name: string;
  expiration: number;
};

type Credentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  login: {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
};

export default NextAuth({
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: Credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const { email, password } = credentials;
          const { login } = await gqlClient.request<LoginResponse>(
            GQL_MUTATION_AUTHENTICATE_USER,
            {
              email,
              password,
            },
          );
          const { jwt, user } = login;
          const { username } = user;
          if (!jwt) {
            return null;
          }

          return {
            jwt,
            name: username,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (token: NextAuthSession, user: NextAuthSession) => {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

      if (isSignIn) {
        if (!user || !user.jwt || !user.name) {
          return Promise.resolve({});
        }

        token.jwt = user.jwt;
        token.name = user.name;

        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > token.expiration) return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
    session: async (session, token: NextAuthSession) => {
      if (!token?.jwt || !token?.expiration || !token.name) {
        return null;
      }

      session.accessToken = token.jwt;
      session.user = {
        name: token.name,
      };
      return { ...session };
    },
  },
});

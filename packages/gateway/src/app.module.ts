import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

const apolloKey = process.env.APOLLO_KEY;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],

        context: ({ req }) => {
          // if (req.body.operationName === 'login') {
          //   return {};
          // } else if (req.user) {
          //   const user = req.user;
          //   return { user };
          // } else {
          //   console.error(
          //     'Authentication error while creating GQL Context',
          //     new Date().toLocaleTimeString(),
          //   );
          //   throw new Error('Authentication error while creating GQL Context');
          // }
        },
      },
      gateway: {
        debug: process.env.NODE_ENV !== 'production',
        makeSubscriptionSc,

        // buildService({ name, url }) {
        //   return new RemoteGraphQLDataSource({
        //     url,
        //     willSendRequest({ request, context }) {
        //       request.http.headers.set(
        //         'user',
        //         context['user'] ? JSON.stringify(context['user']) : null,
        //       );
        //     },
        //   });
        // },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: {
          origin: process.env.ALLOWED_URL,
          credentials: true,
        },
        introspection: true,
        //plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      },
      gateway: {
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            async willSendRequest({ request, context }) {
              const headers = context.req.headers;
              for (const key in headers) {
                const value = headers[key];
                if (value) {
                  request.http?.headers.set(key, String(value));
                }
              }
            },
          });
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

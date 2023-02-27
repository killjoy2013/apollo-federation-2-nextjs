import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { EventResolver } from './resolvers/event.resolver';
import { EventProducerService } from './services/event.producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: (ctx) => {
        const { req } = ctx;

        const username = req.headers.username ?? null;
        const rights = req.headers.rights
          ? req.headers.rights.split(',').map((m) => m.trim())
          : null;
        return { username, rights };
      },
    }),
  ],
  controllers: [],
  providers: [EventResolver, EventProducerService],
})
export class AppModule {}

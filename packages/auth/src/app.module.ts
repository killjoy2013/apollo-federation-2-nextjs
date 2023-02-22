import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoleRightModule } from './role-right/role-right.module';
import { UserModule } from './user/user.module';
import GraphQLJSON from 'graphql-type-json';
import configuration from '../config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      resolvers: { JSON: GraphQLJSON },

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'auth.schema.graphql'),
      },

      context: ({ req }) => {
        const username = req.headers.username ?? null;
        const rights = req.headers.rights
          ? req.headers.rights.split(',').map((m) => m.trim())
          : null;
        return { username, rights };
      },
    }),

    TypeOrmModule.forRoot(dataSourceOptions),
    RoleRightModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

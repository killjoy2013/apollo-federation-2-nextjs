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
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      resolvers: { JSON: GraphQLJSON },

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'auth.schema.graphql'),
      },

      context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
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

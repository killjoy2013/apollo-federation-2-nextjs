// import { OnentModule } from './onent/onent.module';
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
import { HobbyModule } from './hobby/hobby.module';
import { City } from './person/entities/city.proxy.entity';

import { PersonModule } from './person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'people.schema.graphql'),
      },

      buildSchemaOptions: {
        orphanedTypes: [City],
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

    HobbyModule,
    PersonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

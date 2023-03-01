import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { join } from 'path';
import { dataSourceOptions } from './db/data-source';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';

import { TreatyModule } from './treaty/treaty.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'country.schema.graphql'),
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

    CountryModule,
    CityModule,
    TreatyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

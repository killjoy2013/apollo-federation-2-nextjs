import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { dataSourceOptions } from './db/data-source';
import { join } from 'path';
import { MealModule } from './meal/meal.module';
import { City } from './restaurant/entities/city.proxy.entity';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,

      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'food.schema.graphql'),
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

    RestaurantModule,
    MealModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

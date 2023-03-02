import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlRequestService } from 'src/services/graphql-request.service';
import { CityResolver } from './city.proxy.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],

  providers: [
    RestaurantResolver,
    RestaurantService,
    CityResolver,
    GraphqlRequestService,
  ],
  exports: [],
  controllers: [],
})
export class RestaurantModule {}

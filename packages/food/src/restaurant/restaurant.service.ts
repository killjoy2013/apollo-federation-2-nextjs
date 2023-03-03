import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request, gql, GraphQLClient, RequestDocument } from 'graphql-request';
import { graphql } from '../gql/gql';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { Size } from './enums';
//import { createGraphqlClient } from 'src/helpers';
import { CITY } from 'src/gql_definitions/queries';
import { GraphqlRequestService } from 'src/services/graphql-request.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
    private graphqlRequestService: GraphqlRequestService,
    private readonly config: ConfigService,
  ) {}

  async create(input: CreateRestaurantInput): Promise<Restaurant> {
    return await this.restaurantRepo.save(input);
  }

  async findAll(name: string = null): Promise<Restaurant[]> {
    if (name !== null) {
      const res = await this.restaurantRepo
        .createQueryBuilder('restaurant')
        .where('restaurant.name like :name', { name: `%${name}%` })
        .getMany();

      return res;
    } else {
      return await this.restaurantRepo.find();
    }
  }

  async findByCityId(cityId: number): Promise<Restaurant[]> {
    return await this.restaurantRepo.find({
      where: {
        cityId,
      },
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    return await this.restaurantRepo.findOne({ where: { id } });
  }

  async update(
    ctx: ExecutionContext,
    input: UpdateRestaurantInput,
  ): Promise<Restaurant> {
    const found = await this.restaurantRepo.findOne({
      where: {
        id: input.id,
      },
    });

    const { city } = await this.graphqlRequestService.client.request(
      CITY,
      {
        cityId: found.cityId,
      },
      {
        ...ctx.session,
      },
    );

    const size =
      city.population <= 1000
        ? Size.Small
        : city.population <= 20000
        ? Size.Medium
        : Size.Large;

    const updatedRestaurant = await this.restaurantRepo.save({
      ...found,
      ...input,
      size,
    });

    return updatedRestaurant;
  }

  async remove(id: number) {
    const found = await this.restaurantRepo.findOne({
      where: {
        id,
      },
    });
    if (found) {
      await this.restaurantRepo.remove(found);
      return id;
    } else {
      return null;
    }
  }
}

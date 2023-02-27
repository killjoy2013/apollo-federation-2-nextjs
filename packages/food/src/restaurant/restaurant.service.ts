import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request, gql, GraphQLClient } from 'graphql-request';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  async create(input: CreateRestaurantInput): Promise<Restaurant> {
    return await this.restaurantRepo.save(input);
  }

  async findAll(name: string = null): Promise<Restaurant[]> {
    if (name !== null) {
      return await this.restaurantRepo
        .createQueryBuilder('restaurant')
        .where('restaurant.name like :name', { name: `%${name}%` })
        .getMany();
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

  async update(input: UpdateRestaurantInput): Promise<Restaurant> {
    const found = await this.restaurantRepo.findOne({
      where: {
        id: input.id,
      },
    });
    const updatedRestaurant = await this.restaurantRepo.save({
      ...found,
      ...input,
    });

    const graphQLClient = new GraphQLClient('http://localhost:4000', {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJyaWdodHMiOlsicmVtb3ZlQ2l0eSIsInJlbW92ZUNvdW50cnkiLCJjb3VudHJpZXMiLCJjaXRpZXMiXSwiaWF0IjoxNjc3MzI3MjgzLCJleHAiOjE2Nzk5MTkyODMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzEwMCJ9.bU1xEiBOY6-htmxg7HIte-0CkIKcrVRnETpc3gcbvnkSzDDeQZOdeYtEMjgLN86MZ4KTVd8l1Fpxw1z6aq-1oZ2jP6RF548RNH1muJoP0dQYwyEjr2HRA_ax72rRyGq6i_e-_G3Szz2eJJBoDEg_PxyXRg3CS2Mp1tpQdwJ6zJ1p_9vtAkWfobKKobyADP4D2-ciUveW33thsRTQfYvQRwc0goQk7PrAdZAr9jaQGhvZG7LPjITJo23b4msQzBFAGIvcp7M4rcIBAkBGehtvUzX4LfCC64mlbydhTrVpJg1aXdf5WGP6lpm_agV8fQoETXTHWjwaDGuKo1Y5WSALt9j03p2nwpPzO1Ciaa-MvnCtd4m8hlwph7UgIzdvoMwH5gUBOtDYsrvj-wbKmF46gd9bH246aiCLovMn2PyFpaP4VnhKez71XdnK0dYtJNifgNR9af4DlRsJGrHXHPzF9c9oAe3fliAiWoL1KBO4vh2S1QG2_r2aYATGOFo2qDR8',
      },
    });

    const RestaurantUpdatedEvent = gql`
      mutation RestaurantUpdatedEvent($input: UpdateRestaurantInput) {
        restaurantUpdatedEvent(input: $input)
      }
    `;

    await graphQLClient.request(RestaurantUpdatedEvent, {
      input: {
        cityId: 1,
        id: 2,
        name: 'Mikla',
      },
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

import { Injectable } from '@nestjs/common';
import { UpdateRestaurantInput } from 'src/graphql';

@Injectable()
export class EventProducerService {
  async produceCityMichelinUpdate(
    input: UpdateRestaurantInput,
  ): Promise<number> {
    return Promise.resolve(input.id);
  }
}

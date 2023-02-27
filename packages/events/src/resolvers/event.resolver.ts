import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateRestaurantInput } from 'src/graphql';

import { EventProducerService } from '../services/event.producer.service';

@Resolver('Events')
export class EventResolver {
  constructor(private readonly eventService: EventProducerService) {}

  @Mutation('restaurantUpdatedEvent')
  async restaurantUpdatedEvent(@Args('input') input: UpdateRestaurantInput) {
    return await this.eventService.produceCityMichelinUpdate(input);
  }

  @Query('hello')
  hello() {
    return 'Hiiii';
  }
}

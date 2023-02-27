import { graphql } from '../../gql';

const UPDATE_RESTAURANT = graphql(`
  mutation RestaurantUpdatedEvent($input: UpdateRestaurantInput) {
    restaurantUpdatedEvent(input: $input)
  }
`);

export const Mutations = {
  UPDATE_RESTAURANT,
};

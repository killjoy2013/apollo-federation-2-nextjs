import gql from 'graphql-tag';

const UPDATE_RESTAURANT = gql`
  mutation RestaurantUpdatedEvent($input: UpdateRestaurantInput) {
    restaurantUpdatedEvent(input: $input)
  }
`;

export const Mutations = {
  UPDATE_RESTAURANT,
};

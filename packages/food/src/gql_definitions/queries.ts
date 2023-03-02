import { graphql } from '../gql/gql';

const CITY = graphql(`
  query City($cityId: Int!) {
    city(id: $cityId) {
      id
      name
      population
    }
  }
`);

export const Queries = {
  CITY,
};

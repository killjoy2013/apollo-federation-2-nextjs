import { graphql } from '../gql/gql';

export const CITY = graphql(`
  query City($cityId: Int!) {
    city(id: $cityId) {
      id
      name
      population
    }
  }
`);

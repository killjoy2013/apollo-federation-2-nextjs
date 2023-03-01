import gql from 'graphql-tag';

const CITY = gql`
  query City($cityId: Int!) {
    city(id: $cityId) {
      id
      name
      population
    }
  }
`;

export const Queries = {
  CITY,
};

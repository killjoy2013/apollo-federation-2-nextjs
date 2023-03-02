import { GraphQLClient } from 'graphql-request';

export const createGraphqlClient = (
  username: string,
  rights: any,
): GraphQLClient => {
  return new GraphQLClient('http://localhost:4002', {
    headers: {
      username,
      rights,
    },
  });
};

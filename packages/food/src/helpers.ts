import { GraphQLClient } from 'graphql-request';

export const createGraphqlClient = (username: string, rights: any) => {
  return new GraphQLClient('http://localhost:4002', {
    headers: {
      username,
      rights,
    },
  });
};

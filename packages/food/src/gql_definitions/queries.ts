import gql from 'graphql-tag';

const HELLO = gql`
  query hello {
    hello
  }
`;

export const Queries = {
  HELLO,
};

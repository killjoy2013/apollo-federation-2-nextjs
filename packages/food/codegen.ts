import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../router/supergraph-schema.graphql',
  documents: ['./src/gql_definitions/queries.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

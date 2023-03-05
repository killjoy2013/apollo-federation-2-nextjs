import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import getConfig from 'next/config';
import { useMemo } from 'react';
import { alertMessageVar, cache } from './cache';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
let apolloClient: ApolloClient<NormalizedCacheObject>;
type InitialState = NormalizedCacheObject | null;

export function initializeApollo(initialState: InitialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps

    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;
  return apolloClient;
}

const customFetch = async (uri: any, options: any) => {
  options.credentials = 'include';
  return fetch(uri, options);
};

function createIsomorphicLink() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { HttpLink } = require('@apollo/client/link/http');

  const uri =
    typeof window === 'undefined'
      ? serverRuntimeConfig.graphqlUrlSsr
      : publicRuntimeConfig.graphqlUrlClient;

  const httpLink = new HttpLink({
    credentials: 'include',
    uri,
    fetch: customFetch,
    // headers: {
    //   'my-header': 'testtttt',
    // },
  });

  return httpLink;
}

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    const wholeMessage = graphQLErrors.map((m) => m.message).join(' - ');
    alertMessageVar({ severity: 'error', message: wholeMessage });
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === undefined,
    link: ApolloLink.from([errorLink, createIsomorphicLink()]),
    cache: cache,
  });
}

export function useApollo(initialState: InitialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

import { NormalizedCache } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import MyAlert from 'components/alert';
import { GetServerSidePropsContext } from 'next';

import React, { FC, useEffect } from 'react';
import { alertMessageVar } from 'src/cache';
import { useCitiesQuery, useRemoveCityMutation } from 'src/graphql/types';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { initializeApollo } from 'src/apollo';
import { Queries } from 'src/gql_definitions/queries';

type CitiesType = {
  initialApolloState: NormalizedCache;
  alertMessage: string;
};

const Cities: FC<CitiesType> = (props) => {
  const { data, loading, error } = useCitiesQuery();

  console.log('CITIES', data);

  const [
    removeCity,
    { data: removeData, loading: removeLoading, error: removeError },
  ] = useRemoveCityMutation({
    update(cache, { data: { removeCity: removedId } }) {
      cache.evict({ id: `City:${removedId}` });
      cache.gc();
    },
  });

  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  return (
    <>
      <h1>Cities</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.cities.map((city) => (
            <TableRow key={city.id}>
              <TableCell>{city.name}</TableCell>

              <TableCell>
                <IconButton
                  onClick={async () => {
                    try {
                      await removeCity({
                        variables: {
                          id: city.id,
                        },
                      });
                    } catch (error) {}
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MyAlert />
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permenant: false,
      },
    };
  }

  const token = await getToken({
    req,
    raw: true,
  });

  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: Queries.CITIES,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'network-only',
  });

  const normCache = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState: normCache,
    },
  };
}

export default Cities;

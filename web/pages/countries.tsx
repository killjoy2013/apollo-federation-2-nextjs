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
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import { useSession } from 'next-auth/react';
import { FC, useCallback, useEffect } from 'react';
import { initializeApollo } from 'src/apollo';
import { alertMessageVar } from 'src/cache';
import { Queries } from 'src/gql_definitions/queries';
import {
  CountriesQuery,
  useCountriesQuery,
  useRemoveCountryMutation,
} from 'src/graphql/types';
import { authOptions } from './api/auth/[...nextauth]';

type CountriesType = {
  initialApolloState: NormalizedCache;
  rights: string[];
};

const Countries: FC<CountriesType> = (props) => {
  const { rights } = props;

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { data, loading, error } = useCountriesQuery();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { data: session, status } = useSession();

  console.log('COUNTRIES CLIENT SESSION', { status });

  const [removeCountry] = useRemoveCountryMutation({
    update(cache, { data: { removeCountry: removedId } }) {
      cache.evict({ id: `Country:${removedId}` });
      cache.gc;

      // const { countries: oldCountries } = cache.readQuery<CountriesQuery>({
      //   query: Queries.COUNTRIES,
      // });

      // cache.writeQuery<CountriesQuery>({
      //   query: Queries.COUNTRIES,
      //   data: {
      //     countries: oldCountries.filter((f) => f.id != removedId),
      //   },
      // });
    },
  });
  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  const displayDelete = useCallback(
    (countryId: number) => {
      if (rights.includes('removeCountry')) {
        return (
          <IconButton
            onClick={async () => {
              try {
                await removeCountry({
                  variables: {
                    id: countryId,
                  },
                });
              } catch (error) {}
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      } else {
        return null;
      }
    },
    [removeCountry, rights],
  );

  return (
    <>
      <h1>Countries</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Continent</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.countries.map((country) => (
            <TableRow key={country.id}>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.continent}</TableCell>
              <TableCell>{displayDelete(country.id)}</TableCell>
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
  await apolloClient.query<CountriesQuery>({
    query: Queries.COUNTRIES,
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
      rights: session.user?.rights,
    },
  };
}

export default Countries;

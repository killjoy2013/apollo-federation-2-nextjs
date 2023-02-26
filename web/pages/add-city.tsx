import { NormalizedCache } from '@apollo/client';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import MyAlert from 'components/alert';
import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { initializeApollo } from 'src/apollo';
import { alertMessageVar } from 'src/cache';
import { Queries } from 'src/gql_definitions/queries';
import {
  CountriesQuery,
  CreateCityInput,
  useCountriesQuery,
  useCreateCityMutation,
} from 'src/graphql/types';
import { authOptions } from './api/auth/[...nextauth]';

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyaWdodHMiOlsicmVtb3ZlQ2l0eSIsInJlbW92ZUNvdW50cnkiLCJjb3VudHJpZXMiLCJjaXRpZXMiXSwidXNlcm5hbWUiOiJhZG1pbiIsInN1YiI6MSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMTAwIiwiaWF0IjoxNjc3MzI3NjAyLCJleHAiOjE2Nzk5MTk2MDJ9.h9iK8HWjQH9-VdbhvmrJWkpTY1rzV-u7noJxtmyT4CccYtvQLI06zclvCA8CzLBckJhQJSws8Pn4mKJCqVrianfx92MkrFaszX66Dx7CCN_sVRdixCFJRmvx-pO5gLYL61eLlQjPLGYeCkSmFBIZrOUFuB1QvzCkIEN2H66IvkcjoIR2oZrjVZrHAFiAohQHTboueldKX2dIgWypTMNNsSYKP3p9YnYydkoMKUKIAcby9rpdv0JnPXv5KBEZgnxriaAPR3K6ZyYe1oLGZ-4h_YDKPvBykqMc3B56-__c7yHqjFbGHyaLUA6AL8SjY_wPtkI8bBj_BAAQcJTzXVbgwb4eORYinnywt5a7GUG4_m-kOyJOLzjQfe9xc53TTZ2tAJFBRp6Wq15-LqDhfXUEEV5JAezHzABlL13kVv8ftHU4KRgrCYVxZO0Wf48drg-B4YtMZTQZbHrKxq4mL7j6OjaxFnojixvYZ_3LtH-6I00q17pzR5mB1CxKKqAlTA3-`;

type AddCityType = {
  initialApolloState: NormalizedCache;
  alertMessage: string;
};

const AddCity: FC<AddCityType> = (props) => {
  const { alertMessage } = props;
  const {
    data: { countries },
    loading,
    error,
  } = useCountriesQuery();
  const { data: session, status } = useSession();
  const [
    createCity,
    {
      data: createCityData,
      loading: createCityLoading,
      error: createCityError,
    },
  ] = useCreateCityMutation();

  const [cityData, setCityData] = useState<CreateCityInput>({
    name: '',
    population: undefined,
    countryId: 0,
  });

  const CreateHandler = async () => {
    createCity({
      variables: {
        input: { ...cityData },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };

  useEffect(() => {
    createCityData &&
      alertMessageVar({ severity: 'success', message: 'success' });
    createCityLoading &&
      alertMessageVar({ severity: 'info', message: 'progress...' });
    createCityError &&
      alertMessageVar({ severity: 'error', message: 'error :-(' });
  }, [createCityData, createCityLoading, createCityError]);

  useEffect(() => {
    alertMessageVar(undefined);
  }, []);

  return (
    <>
      <h1>Add City</h1>
      <Grid container direction="column" spacing={2} sx={{ width: '500px' }}>
        <Grid item>
          <TextField
            label="City name"
            value={cityData.name}
            onChange={(e) => setCityData({ ...cityData, name: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Population"
            value={cityData.population}
            onChange={(e) => {
              const population = e.target.value
                ? Number(e.target.value)
                : undefined;

              setCityData({
                ...cityData,
                population,
              });
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" sx={{ minWidth: 220 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={cityData.countryId}
              label="Country"
              onChange={(e) =>
                setCityData({
                  ...cityData,
                  countryId: e.target.value as number,
                })
              }
            >
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={CreateHandler}>
            Create
          </Button>
        </Grid>
        <Grid item>
          <MyAlert />
        </Grid>
      </Grid>
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
    },
  };
}

export default AddCity;

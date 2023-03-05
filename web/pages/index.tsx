import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { GetServerSidePropsContext } from 'next';

import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const Homepage = () => {
  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <Typography variant="h4">Home Page</Typography>
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  debugger;
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  debugger;
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Homepage;

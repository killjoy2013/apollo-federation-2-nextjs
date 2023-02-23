import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

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
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

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

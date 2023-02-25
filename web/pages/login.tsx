import AuthForm from 'components/auth/auth-form';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]';

const Login = () => {
  return <AuthForm />;
};

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permenant: false,
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
}

export default Login;

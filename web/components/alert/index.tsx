import React from 'react';
import Alert from '@mui/material/Alert';
import { FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import { alertMessageVar } from 'src/cache';

type MyAlertType = {
  dumm?: string;
};

const MyAlert: FC<MyAlertType> = (props) => {
  const alertMessage = useReactiveVar(alertMessageVar);

  if (alertMessage) {
    return (
      <Alert severity={alertMessage?.severity}>{alertMessage?.message}</Alert>
    );
  } else {
    return null;
  }
};

export default MyAlert;

import * as React from 'react';
import { Toaster, useToastController, Alert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const CustomTimeout = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () => dispatchToast(<Alert intent="info">Custom timeout 1000ms</Alert>, { timeout: 1000 });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

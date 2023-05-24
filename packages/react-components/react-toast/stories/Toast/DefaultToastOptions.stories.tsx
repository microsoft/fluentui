import * as React from 'react';
import { Toaster, useToastController, Alert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DefaultToastOptions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () => dispatchToast(<Alert intent="info">Options configured in Toaster</Alert>);

  return (
    <>
      <Toaster toasterId={toasterId} position="top-right" pauseOnHover pauseOnWindowBlur timeout={1000} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

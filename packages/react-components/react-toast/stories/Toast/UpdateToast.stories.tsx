import * as React from 'react';
import { Toaster, useToastController, Alert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () => dispatchToast(<Alert intent="warning">This toast never closes</Alert>, { toastId, timeout: -1 });
  const update = () =>
    updateToast({ content: <Alert intent="success">This toast will close soon</Alert>, toastId, timeout: 1000 });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={update}>Update toast</button>
    </>
  );
};

import * as React from 'react';
import { Toaster, useToastController, Alert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DismissToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const { dispatchToast, dismissToast } = useToastController(toasterId);
  const notify = () => dispatchToast(<Alert intent="success">This is a toast</Alert>, { toastId });
  const dismiss = () => dismissToast(toastId);

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={dismiss}>Dismiss toast</button>
    </>
  );
};

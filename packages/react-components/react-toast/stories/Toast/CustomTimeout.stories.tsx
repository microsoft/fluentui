import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

let toastId = 0;

export const CustomTimeout = () => {
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('This is a toast', { toastId: (toastId++).toString(), timeout: 1000 });

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

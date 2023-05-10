import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

export const CustomTimeout = () => {
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('This is a toast', { timeout: 1000 });

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

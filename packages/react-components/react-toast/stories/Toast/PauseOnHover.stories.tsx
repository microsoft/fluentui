import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

export const PauseOnHover = () => {
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('Hover me!', { pauseOnHover: true });

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

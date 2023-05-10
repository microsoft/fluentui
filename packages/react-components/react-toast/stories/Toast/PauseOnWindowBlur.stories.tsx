import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

export const PauseOnWindowBlur = () => {
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('Click on another window!', { pauseOnWindowBlur: true });

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

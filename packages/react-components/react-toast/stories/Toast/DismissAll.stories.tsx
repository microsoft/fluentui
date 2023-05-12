import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

export const DismissAll = () => {
  const { dispatchToast, dismissToast } = useToastController();
  const notify = () => dispatchToast('This is a toast');

  return (
    <>
      <Toaster />
      <button onClick={() => notify()}>Make toast</button>
      <button onClick={() => dismissToast()}>Dismiss all</button>
    </>
  );
};

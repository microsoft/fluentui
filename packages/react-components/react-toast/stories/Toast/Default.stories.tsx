import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

export const Default = () => {
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('This is a toast');

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';

export const DefaultToastOptions = () => {
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('This is a toast');

  return (
    <>
      <Toaster position="top-right" pauseOnHover pauseOnWindowBlur timeout={1000} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

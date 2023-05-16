import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DefaultToastOptions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('This is a toast', { toasterId });

  return (
    <>
      <Toaster toasterId={toasterId} position="top-right" pauseOnHover pauseOnWindowBlur timeout={1000} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

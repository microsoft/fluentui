import * as React from 'react';
import { Toaster, useToastController, ToastTitle, ToastLayout } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DefaultToastOptions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="info">Options configured in Toaster</ToastTitle>
      </ToastLayout>,
    );

  return (
    <>
      <Toaster toasterId={toasterId} position="top-right" pauseOnHover pauseOnWindowBlur timeout={1000} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

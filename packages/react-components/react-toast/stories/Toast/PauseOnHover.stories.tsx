import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const PauseOnHover = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="info">Hover me!</ToastTitle>
      </Toast>,
      { pauseOnHover: true },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

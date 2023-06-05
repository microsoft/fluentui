import * as React from 'react';
import { Toaster, useToastController, ToastTitle, ToastLayout } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const CustomTimeout = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="info">Custom timeout 1000ms</ToastTitle>
      </ToastLayout>,
      { timeout: 1000 },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

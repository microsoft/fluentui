import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DismissToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const { dispatchToast, dismissToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="success">This is a toast</ToastTitle>
      </Toast>,
      { toastId },
    );
  const dismiss = () => dismissToast(toastId);

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={dismiss}>Dismiss toast</button>
    </>
  );
};

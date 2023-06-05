import * as React from 'react';
import { Toaster, useToastController, ToastTitle, ToastLayout } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DismissAll = () => {
  const toasterId = useId('toaster');
  const { dispatchToast, dismissAllToasts } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="success">'This is a toast</ToastTitle>
      </ToastLayout>,
    );
  const dismissAll = () => dismissAllToasts();

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={dismissAll}>Dismiss all</button>
    </>
  );
};

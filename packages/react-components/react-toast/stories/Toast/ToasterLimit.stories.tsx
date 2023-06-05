import * as React from 'react';
import { Toaster, useToastController, ToastTitle, ToastLayout } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const ToasterLimit = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="success">Limited to 3 toasts</ToastTitle>
      </ToastLayout>,
    );

  return (
    <>
      <Toaster toasterId={toasterId} limit={3} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

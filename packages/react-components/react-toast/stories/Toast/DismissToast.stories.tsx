import * as React from 'react';
import { Toaster, useToastController, ToastId } from '@fluentui/react-toast';

export const DismissToast = () => {
  const { dispatchToast, dismissToast } = useToastController();
  const notify = (id: ToastId) => dispatchToast('This is a toast', { toastId: id });

  return (
    <>
      <Toaster />
      <button onClick={() => notify('example')}>Make toast</button>
      <button onClick={() => dismissToast('example')}>Dismiss all</button>
    </>
  );
};

import * as React from 'react';
import { Toaster, useToastController, ToastId } from '@fluentui/react-toast';

export const UpdateToast = () => {
  const { dispatchToast, updateToast } = useToastController();
  const notify = (id: ToastId) => dispatchToast('This toast never closes', { toastId: id, timeout: -1 });
  const update = (id: ToastId) => updateToast({ content: 'This toast will close soon', toastId: id, timeout: 1000 });

  return (
    <>
      <Toaster />
      <button onClick={() => notify('EXAMPLE_ID')}>Make toast</button>
      <button onClick={() => update('EXAMPLE_ID')}>Update toast</button>
    </>
  );
};

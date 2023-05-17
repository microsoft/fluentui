import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DismissToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const { dispatchToast, dismissToast } = useToastController();
  const notify = () => dispatchToast('This is a toast', { toastId, toasterId });
  const dismiss = () => dismissToast(toastId, toasterId);

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={dismiss}>Dismiss toast</button>
    </>
  );
};

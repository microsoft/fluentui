import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const DismissAll = () => {
  const toasterId = useId('toaster');
  const { dispatchToast, dismissAllToasts } = useToastController();
  const notify = () => dispatchToast('This is a toast', { toasterId });
  const dismissAll = () => dismissAllToasts(toasterId);

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={dismissAll}>Dismiss all</button>
    </>
  );
};

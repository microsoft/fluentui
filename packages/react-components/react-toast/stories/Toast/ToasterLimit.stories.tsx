import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const ToasterLimit = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('This is a toast', { toasterId });

  return (
    <>
      <Toaster toasterId={toasterId} limit={3} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

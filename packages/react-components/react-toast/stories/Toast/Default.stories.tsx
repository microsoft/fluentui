import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const Default = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () => dispatchToast('This is a toast');

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

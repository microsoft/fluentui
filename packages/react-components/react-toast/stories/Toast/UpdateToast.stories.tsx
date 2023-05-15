import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const { dispatchToast, updateToast } = useToastController();
  const notify = () => dispatchToast('This toast never closes', { toastId, timeout: -1, toasterId });
  const update = () => updateToast({ content: 'This toast will close soon', toastId, timeout: 1000, toasterId });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={update}>Update toast</button>
    </>
  );
};

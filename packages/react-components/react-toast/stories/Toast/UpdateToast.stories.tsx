import * as React from 'react';
import { Toaster, useToastController, ToastAlert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(<ToastAlert intent="warning">This toast never closes</ToastAlert>, { toastId, timeout: -1 });
  const update = () =>
    updateToast({
      content: <ToastAlert intent="success">This toast will close soon</ToastAlert>,
      toastId,
      timeout: 1000,
    });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
      <button onClick={update}>Update toast</button>
    </>
  );
};

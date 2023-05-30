import * as React from 'react';
import { Toaster, useToastController, ToastAlert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const PauseOnWindowBlur = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(<ToastAlert intent="info">Click on another window!</ToastAlert>, { pauseOnWindowBlur: true });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

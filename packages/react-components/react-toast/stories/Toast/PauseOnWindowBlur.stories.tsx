import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const PauseOnWindowBlur = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController();
  const notify = () => dispatchToast('Click on another window!', { pauseOnWindowBlur: true, toasterId });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

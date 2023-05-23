import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const PauseOnHover = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () => dispatchToast('Hover me!', { pauseOnHover: true });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

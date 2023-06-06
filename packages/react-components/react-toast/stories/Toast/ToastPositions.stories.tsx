import * as React from 'react';
import { Toaster, useToastController, ToastPosition, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const ToastPositions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = (position: ToastPosition) =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="success">This toast is {position}</ToastTitle>
      </Toast>,
      { position },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={() => notify('bottom-start')}>bottom-start</button>
      <button onClick={() => notify('bottom-end')}>bottom-end</button>
      <button onClick={() => notify('top-start')}>top-start</button>
      <button onClick={() => notify('top-end')}>top-end</button>
    </>
  );
};

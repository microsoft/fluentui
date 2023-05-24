import * as React from 'react';
import { Toaster, useToastController, ToastPosition, ToastAlert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const ToastPositions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = (position: ToastPosition) =>
    dispatchToast(<ToastAlert intent="success">This toast is {position}</ToastAlert>, { position });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={() => notify('bottom-left')}>bottom-left</button>
      <button onClick={() => notify('bottom-right')}>bottom-right</button>
      <button onClick={() => notify('top-left')}>top-left</button>
      <button onClick={() => notify('top-right')}>top-right</button>
    </>
  );
};

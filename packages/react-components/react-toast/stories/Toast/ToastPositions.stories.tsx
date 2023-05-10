import * as React from 'react';
import { Toaster, useToastController, ToastPosition } from '@fluentui/react-toast';

export const ToastPositions = () => {
  const { dispatchToast } = useToastController();
  const notify = (position: ToastPosition) => dispatchToast('This is a toast', { position });

  return (
    <>
      <Toaster />
      <button onClick={() => notify('bottom-left')}>bottom-left</button>
      <button onClick={() => notify('bottom-right')}>bottom-right</button>
      <button onClick={() => notify('top-left')}>top-left</button>
      <button onClick={() => notify('top-right')}>top-right</button>
    </>
  );
};

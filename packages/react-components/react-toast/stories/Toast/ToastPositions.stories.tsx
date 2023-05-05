import * as React from 'react';
import { Toaster, toast, ToastPosition } from '@fluentui/react-toast';

export const ToastPositions = () => {
  const notify = (position: ToastPosition) => toast('This is a toast', { position });

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={() => notify('bottom-left')}>bottom-left</button>
      <button onClick={() => notify('bottom-right')}>bottom-right</button>
      <button onClick={() => notify('top-left')}>top-left</button>
      <button onClick={() => notify('top-right')}>top-right</button>
    </>
  );
};

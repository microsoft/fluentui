import * as React from 'react';
import { Toaster, useToastFactory, ToastPosition } from '@fluentui/react-toast';

export const ToastPositions = () => {
  const { createToast } = useToastFactory();
  const notify = (position: ToastPosition) => createToast('This is a toast', { position });

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

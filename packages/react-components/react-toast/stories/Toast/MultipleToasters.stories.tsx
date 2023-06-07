import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const MultipeToasters = () => {
  const first = useId('toaster-1');
  const second = useId('toaster-2');
  const { dispatchToast: dispatchFirstToast } = useToastController(first);
  const { dispatchToast: dispatchSecondToast } = useToastController(second);
  const notifyFirst = () =>
    dispatchFirstToast(
      <Toast>
        <ToastTitle intent="info">First toaster</ToastTitle>
      </Toast>,
    );
  const notifySecond = () =>
    dispatchSecondToast(
      <Toast>
        <ToastTitle intent="info">Second toaster</ToastTitle>
      </Toast>,
    );

  return (
    <>
      <Toaster toasterId={first} position="bottom-end" />
      <Toaster toasterId={second} position="top-end" />
      <button onClick={notifyFirst}>Toaster first</button>
      <button onClick={notifySecond}>Toaster second</button>
    </>
  );
};

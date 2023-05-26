import * as React from 'react';
import { Toaster, useToastController, ToastAlert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const MultipeToasters = () => {
  const first = useId('toaster-1');
  const second = useId('toaster-2');
  const { dispatchToast: dispatchFirstToast } = useToastController(first);
  const { dispatchToast: dispatchSecondToast } = useToastController(second);
  const notifyFirst = () => dispatchFirstToast(<ToastAlert intent="info">First toaster</ToastAlert>);
  const notifySecond = () => dispatchSecondToast(<ToastAlert intent="info">Second toaster</ToastAlert>);

  return (
    <>
      <Toaster toasterId={first} position="bottom-right" />
      <Toaster toasterId={second} position="top-right" />
      <button onClick={notifyFirst}>Toaster first</button>
      <button onClick={notifySecond}>Toaster second</button>
    </>
  );
};

import * as React from 'react';
import { Toaster, useToastController } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const MultipeToasters = () => {
  const first = useId('toaster-1');
  const second = useId('toaster-2');
  const { dispatchToast } = useToastController();
  const notifyFirst = () => dispatchToast('Toaster first', { toasterId: first });
  const notifySecond = () => dispatchToast('Toaster second', { toasterId: second });

  return (
    <>
      <Toaster toasterId={first} position="bottom-right" />
      <Toaster toasterId={second} position="top-right" />
      <button onClick={notifyFirst}>Toaster first</button>
      <button onClick={notifySecond}>Toaster second</button>
    </>
  );
};

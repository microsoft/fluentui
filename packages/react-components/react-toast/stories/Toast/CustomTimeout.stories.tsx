import * as React from 'react';
import { Toaster, createToast } from '@fluentui/react-toast';

let toastId = 0;

export const CustomTimeout = () => {
  const notify = () => createToast('This is a toast', { toastId: (toastId++).toString(), timeout: 1000 });

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

import * as React from 'react';
import { Toaster, useToastFactory } from '@fluentui/react-toast';

let toastId = 0;

export const CustomTimeout = () => {
  const { createToast } = useToastFactory();
  const notify = () => createToast('This is a toast', { toastId: (toastId++).toString(), timeout: 1000 });

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

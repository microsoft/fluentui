import * as React from 'react';
import { Toaster, useToastFactory } from '@fluentui/react-toast';

export const Default = () => {
  const { createToast } = useToastFactory();
  const notify = () => createToast('This is a toast');

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

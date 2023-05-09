import * as React from 'react';
import { Toaster, createToast } from '@fluentui/react-toast';

export const Default = () => {
  const notify = () => createToast('This is a toast');

  return (
    <>
      <Toaster />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

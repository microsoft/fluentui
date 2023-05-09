import * as React from 'react';
import { Toaster, createToast } from '@fluentui/react-toast';

export const Default = () => {
  const notify = () => createToast('This is a toast');

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

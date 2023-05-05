import * as React from 'react';
import { Toaster, toast } from '@fluentui/react-toast';

export const Default = () => {
  const notify = () => toast('This is a toast');

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

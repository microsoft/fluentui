import * as React from 'react';
import { Toaster, toast } from '@fluentui/react-toast';

export const DismissAll = () => {
  const notify = () => toast('This is a toast');

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={() => notify()}>Make toast</button>
      <button onClick={() => toast.dismiss()}>Dismiss all</button>
    </>
  );
};

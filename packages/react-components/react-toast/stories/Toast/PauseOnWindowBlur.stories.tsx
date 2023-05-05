import * as React from 'react';
import { toast, Toaster } from '@fluentui/react-toast';

export const PauseOnWindowBlur = () => {
  const notify = () => toast('This is a toast', { pauseOnFocusLoss: true, pauseOnHover: true });

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={notify}>Make toast</button>
      Pauses on hover and window blur
    </>
  );
};

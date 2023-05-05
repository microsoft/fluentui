import * as React from 'react';
import { toast, Toaster } from '@fluentui/react-toast';

const toastId = 'foo';

export const UpdateToast = () => {
  const notify = () => toast('Loading', { toastId, autoClose: false });

  const update = () => toast.update(toastId, { render: 'Downloaded file', autoClose: 3000 });

  return (
    <>
      <Toaster position="bottom-right" targetDocument={document} />
      <button onClick={notify}>Make toast</button>
      <button onClick={update}>Update toast</button>
    </>
  );
};

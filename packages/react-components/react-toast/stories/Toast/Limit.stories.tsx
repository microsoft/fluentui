import * as React from 'react';
import { Toaster, toast } from '@fluentui/react-toast';

let count = 0;
export const Limit = () => {
  const notify = () => toast(`This is toast ${count++}`);

  return (
    <>
      <Toaster limit={3} position="bottom-right" targetDocument={document} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

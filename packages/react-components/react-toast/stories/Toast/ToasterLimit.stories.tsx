import * as React from 'react';
import { Toaster, useToastController, Alert } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const ToasterLimit = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () => dispatchToast(<Alert intent="success">Limited to 3 toasts</Alert>);

  return (
    <>
      <Toaster toasterId={toasterId} limit={3} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

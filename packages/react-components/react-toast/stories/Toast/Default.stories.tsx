import * as React from 'react';
import { Toaster, useToastController, ToastAlert } from '@fluentui/react-toast';
import { useId, Link } from '@fluentui/react-components';

export const Default = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastAlert intent="success" action={<Link>Undo</Link>}>
        Email sent
      </ToastAlert>,
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

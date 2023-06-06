import * as React from 'react';
import { Toaster, useToastController, Toast, ToastTitle, ToastBody, ToastFooter } from '@fluentui/react-toast';
import { useId, Link } from '@fluentui/react-components';

export const Default = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="success" action={<Link>Undo</Link>}>
          Email sent
        </ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

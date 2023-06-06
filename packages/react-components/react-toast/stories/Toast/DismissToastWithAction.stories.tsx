import * as React from 'react';
import { Toaster, useToastController, ToastTitle, ToastTrigger, Toast } from '@fluentui/react-toast';
import { useId, Link } from '@fluentui/react-components';

export const DismissToastWithAction = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          intent="success"
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          Dismiss me
        </ToastTitle>
      </Toast>,
      { timeout: -1 },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={notify}>Make toast</button>
    </>
  );
};

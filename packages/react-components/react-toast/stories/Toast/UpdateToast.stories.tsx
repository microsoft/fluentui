import * as React from 'react';
import { Toaster, useToastController, ToastAlert, ToastTrigger } from '@fluentui/react-toast';
import { useId, Link } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toastId = useId('toast');
  const toasterId = useId('toaster');
  const [dispatched, setDispatched] = React.useState(false);

  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastAlert
        intent="info"
        action={
          <ToastTrigger>
            <Link>Undo</Link>
          </ToastTrigger>
        }
      >
        Sending email...
      </ToastAlert>,
      { timeout: -1, toastId },
    );

  const update = () =>
    updateToast({
      content: (
        <ToastAlert
          intent="success"
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          Email sent
        </ToastAlert>
      ),
      toastId,
      timeout: 2000,
    });

  const onClick = () => {
    if (dispatched) {
      update();
      setDispatched(false);
    } else {
      notify();
      setDispatched(true);
    }
  };

  return (
    <>
      <Toaster toasterId={toasterId} />
      <button onClick={onClick}>{dispatched ? 'Update toast' : 'Make toast'}</button>
    </>
  );
};

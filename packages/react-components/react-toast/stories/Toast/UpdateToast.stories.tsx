import * as React from 'react';
import { Toaster, useToastController, ToastTitle, ToastLayout } from '@fluentui/react-toast';
import { useId } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toastId = useId('toast');
  const toasterId = useId('toaster');
  const [dispatched, setDispatched] = React.useState(false);

  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <ToastLayout>
        <ToastTitle intent="warning">This toast never closes</ToastTitle>
      </ToastLayout>,
      { toastId, timeout: -1 },
    );
  const update = () =>
    updateToast({
      content: (
        <ToastLayout>
          <ToastTitle intent="success">This toast will close soon</ToastTitle>
        </ToastLayout>
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

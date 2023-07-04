import * as React from 'react';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toastId = useId('toast');
  const toasterId = useId('toaster');
  const [unmounted, setUnmounted] = React.useState(true);

  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>This toast never closes</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'warning',
        timeout: -1,
        onStatusChange: (e, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };
  const update = () =>
    updateToast({
      content: (
        <Toast>
          <ToastTitle>This toast will close soon</ToastTitle>
        </Toast>
      ),
      intent: 'success',
      toastId,
      timeout: 2000,
    });

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={unmounted ? notify : update}>{unmounted ? 'Make toast' : 'Update toast'}</Button>
    </>
  );
};

UpdateToast.parameters = {
  docs: {
    description: {
      story: [
        'Use the `updateToast` imperative API to make changes to a Toast that is already visible. To do this',
        'you **must** provide an id when dispatching the toast. Almost all options of a Toast can be updated.',
      ].join('\n'),
    },
  },
};

import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId, Button } from '@fluentui/react-components';

export const UpdateToast = () => {
  const toastId = useId('toast');
  const toasterId = useId('toaster');
  const [dispatched, setDispatched] = React.useState(false);

  const { dispatchToast, updateToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="warning">This toast never closes</ToastTitle>
      </Toast>,
      { toastId, timeout: -1 },
    );
  const update = () =>
    updateToast({
      content: (
        <Toast>
          <ToastTitle intent="success">This toast will close soon</ToastTitle>
        </Toast>
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
      <Button onClick={onClick}>{dispatched ? 'Update toast' : 'Make toast'}</Button>
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

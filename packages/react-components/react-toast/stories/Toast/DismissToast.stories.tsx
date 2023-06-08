import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId, Button } from '@fluentui/react-components';

export const DismissToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('example');
  const [removed, setRemoved] = React.useState(false);
  const { dispatchToast, dismissToast } = useToastController(toasterId);
  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle intent="success">This is a toast</ToastTitle>
      </Toast>,
      { toastId, onStatusChange: status => setRemoved(status === 'removed') },
    );
    setRemoved(false);
  };
  const dismiss = () => dismissToast(toastId);

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={removed ? dismiss : notify}>{removed ? 'Make' : 'Dismiss'} toast</Button>
    </>
  );
};

DismissToast.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can be dismissed imperatively using the `dismissToast` API. In order to imperatively dismiss a ',
        "Toast, it's necessary to dispatch it with a user provided id. You can use the id to dismiss the toast.",
        "**Don't** use this API to dismiss toats when clicking on an action inside the toast, use the `ToastTrigger`",
        'instead.',
      ].join('\n'),
    },
  },
};

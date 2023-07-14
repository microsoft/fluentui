import * as React from 'react';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const DismissAll = () => {
  const toasterId = useId('toaster');
  const { dispatchToast, dismissAllToasts } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>'This is a toast</ToastTitle>
      </Toast>,
      { intent: 'info' },
    );
  const dismissAll = () => dismissAllToasts();

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
      <Button onClick={dismissAll}>Dismiss all toasts</Button>
    </>
  );
};

DismissAll.parameters = {
  docs: {
    description: {
      story: ['The `dismissAllToasts imperative API will dismiss all rendered Toasts.'].join('\n'),
    },
  },
};

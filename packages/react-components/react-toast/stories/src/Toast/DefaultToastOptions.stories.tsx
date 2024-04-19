import * as React from 'react';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const DefaultToastOptions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Options configured in Toaster</ToastTitle>
      </Toast>,
      { intent: 'info' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} position="top-end" pauseOnHover pauseOnWindowBlur timeout={1000} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

DefaultToastOptions.parameters = {
  docs: {
    description: {
      story: [
        'Default options for all toasts can be configured on the `Toaster`.',
        'These options are only defaults and can be overriden using `dispatchToast',
      ].join('\n'),
    },
  },
};

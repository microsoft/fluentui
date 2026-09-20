import * as React from 'react';
import { Button, useId } from '@fluentui/react-components';
import { Toaster, Toast, ToastTitle, useToastController } from '@fluentui/react-modern-components-preview/toast';

export const PauseOnHover = (): React.ReactNode => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Hover me!</ToastTitle>
      </Toast>,
      { pauseOnHover: true, intent: 'info' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

PauseOnHover.parameters = {
  docs: {
    description: {
      story: [
        'The `pauseOnHover` option will enable users to pause the timeout of a toast while the mouse cursor',
        'is inside the toast. This option can also be set on the Toaster as a default.',
      ].join('\n'),
    },
  },
};

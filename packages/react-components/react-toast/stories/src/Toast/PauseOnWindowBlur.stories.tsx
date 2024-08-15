import * as React from 'react';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const PauseOnWindowBlur = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Click on another window!</ToastTitle>
      </Toast>,
      { pauseOnWindowBlur: true, intent: 'info' },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

PauseOnWindowBlur.parameters = {
  docs: {
    description: {
      story: [
        'Use `pauseOnWindowBlur` option to pause the dismiss timeout of a Toast when the user moves focus',
        'to another window. This option can also be set on the Toaster as a default.',
      ].join('\n'),
    },
  },
};

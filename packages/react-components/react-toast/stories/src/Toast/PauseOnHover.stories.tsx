import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Button, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-components';

export const PauseOnHover = (): JSXElement => {
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

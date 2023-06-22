import * as React from 'react';
import { Toaster, useToastController, ToastPosition, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId, Button, Field, RadioGroup, Radio } from '@fluentui/react-components';

export const ToastPositions = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [position, setPosition] = React.useState<ToastPosition>('bottom-end');
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>This toast is {position}</ToastTitle>
      </Toast>,
      { position, intent: 'success' },
    );

  return (
    <>
      <Field label="Select a position">
        <RadioGroup value={position} onChange={(e, data) => setPosition(data.value as ToastPosition)}>
          <Radio label="bottom-start" value="bottom-start" />
          <Radio label="bottom-end" value="bottom-end" />
          <Radio label="top-start" value="top-start" />
          <Radio label="top-end" value="top-end" />
        </RadioGroup>
      </Field>
      <Toaster toasterId={toasterId} />
      <Button onClick={() => notify()}>Make toast</Button>
    </>
  );
};

ToastPositions.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can be dispatched to all four corners of a page. We do not recommend to use more than one',
        'position for toasts in an application because that could be disorienting for users. Pick',
        'one desired position and configure it in the `Toaster`.',
      ].join('\n'),
    },
  },
};

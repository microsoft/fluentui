import * as React from 'react';
import { Button, Field, Radio, RadioGroup, useId } from '@fluentui/react-components';
import { Toaster, Toast, ToastTitle, useToastController } from '@fluentui/react-modern-components-preview/toast';
import type { ToastPosition } from '@fluentui/react-modern-components-preview/toast';

export const ToastPositions = (): React.ReactNode => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [position, setPosition] = React.useState<ToastPosition>('top');
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
          <Radio label="bottom" value="bottom" />
          <Radio label="bottom-start" value="bottom-start" />
          <Radio label="bottom-end" value="bottom-end" />
          <Radio label="top" value="top" />
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

import * as React from 'react';
import { ToastPosition, Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId, Button, Field, SpinButton } from '@fluentui/react-components';

export const Offset = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = (position: ToastPosition) =>
    dispatchToast(
      <Toast>
        <ToastTitle intent="info">
          Offset: {horizontal}, {vertical}
        </ToastTitle>
      </Toast>,
      { position },
    );
  const [horizontal, setHorizontal] = React.useState(10);
  const [vertical, setVertical] = React.useState(10);

  return (
    <>
      <Field label="Horizontal offset">
        <SpinButton
          value={horizontal}
          onChange={(e, data) => {
            console.log(data.value);
            if (data.value) {
              setHorizontal(data.value);
            } else if (data.displayValue !== undefined) {
              const newValue = parseFloat(data.displayValue);
              if (!Number.isNaN(newValue)) {
                setHorizontal(newValue);
              }
            }
          }}
        />
      </Field>
      <Field label="Vertical offset">
        <SpinButton
          value={vertical}
          onChange={(e, data) => {
            console.log(data.value);
            if (data.value) {
              setVertical(data.value);
            } else if (data.displayValue !== undefined) {
              const newValue = parseFloat(data.displayValue);
              if (!Number.isNaN(newValue)) {
                setVertical(newValue);
              }
            }
          }}
        />
      </Field>
      <br />
      <Button onClick={() => notify('bottom-start')}>bottom-start</Button>
      <Button onClick={() => notify('bottom-end')}>bottom-end</Button>
      <Button onClick={() => notify('top-start')}>top-start</Button>
      <Button onClick={() => notify('top-end')}>top-end</Button>
      <Toaster toasterId={toasterId} offset={{ horizontal, vertical }} />
    </>
  );
};

Offset.parameters = {
  docs: {
    description: {
      story: [
        'You can declare a static offset for toasts relative to the viewport. This offset can only be set on the',
        "`Toaster` component, because it wouldn't make sense to have separate toast offsets for a toasts in a",
        'single position.',
      ].join('\n'),
    },
  },
};

import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast, ToastIntent } from '@fluentui/react-toast';
import { useId, Button, Field, RadioGroup, Radio, Spinner, Avatar } from '@fluentui/react-components';

export const Intent = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = React.useState<ToastIntent | 'progress' | 'avatar'>('success');
  const notify = () => {
    switch (intent) {
      case 'progress':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Spinner size="tiny" />}>Progress toast</ToastTitle>
          </Toast>,
          { timeout: -1 },
        );
        break;
      case 'avatar':
        dispatchToast(
          <Toast>
            <ToastTitle media={<Avatar name="Erika Mustermann" size={16} />}>Avatar toast</ToastTitle>
          </Toast>,
        );
        break;
      case 'error':
      case 'info':
      case 'success':
      case 'warning':
        dispatchToast(
          <Toast>
            <ToastTitle intent={intent}>Toast intent: {intent}</ToastTitle>
          </Toast>,
        );
        break;
    }
  };

  return (
    <>
      <Field label="Select a intent">
        <RadioGroup value={intent} onChange={(e, data) => setIntent(data.value as ToastIntent)}>
          <Radio label="success" value="success" />
          <Radio label="info" value="info" />
          <Radio label="warning" value="warning" />
          <Radio label="error" value="error" />
          <Radio label="progress (custom media slot)" value="progress" />
          <Radio label="avatar (custom media slot)" value="avatar" />
        </RadioGroup>
      </Field>
      <Toaster toasterId={toasterId} />
      <Button onClick={() => notify()}>Make toast</Button>
    </>
  );
};

Intent.parameters = {
  docs: {
    description: {
      story: [
        'The toast comes by default with 4 different intents:',
        '- success',
        '- info',
        '- warning',
        '- error',
        '',
        'Each intent affects the default icon in the title and its colour. These icon slots can be overriden',
        'to render other content such as progress spinners or avatars.',
        '',
        '>⚠️ intent does **not** determine urgency of the screen reader aria-live narration,',
        'use the `politeness` option when dispatching a toast',
      ].join('\n'),
    },
  },
};

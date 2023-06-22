import * as React from 'react';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-toast';
import { useId, Button, Field, RadioGroup, Radio } from '@fluentui/react-components';

export const MultipleToasters = () => {
  const first = useId('toaster-1');
  const second = useId('toaster-2');
  const [toaster, setToaster] = React.useState(first);
  const { dispatchToast: dispatchFirstToast } = useToastController(first);
  const { dispatchToast: dispatchSecondToast } = useToastController(second);
  const notify = () => {
    if (toaster === first) {
      dispatchFirstToast(
        <Toast>
          <ToastTitle>First toaster</ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    } else {
      dispatchSecondToast(
        <Toast>
          <ToastTitle>Second toaster</ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    }
  };

  return (
    <>
      <Field label="Toast politeness">
        <RadioGroup value={toaster} onChange={(e, data) => setToaster(data.value)}>
          <Radio label="First toaster" value={first} />
          <Radio label="Second toaster" value={second} />
        </RadioGroup>
      </Field>
      <Toaster toasterId={first} position="bottom-end" />
      <Toaster toasterId={second} position="top-end" />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

MultipleToasters.parameters = {
  docs: {
    description: {
      story: [
        '> ⚠️ This use case is **not recommended**',
        '',
        'Toasters support a `toasterId` prop to support multiple Toasters in an app.',
      ].join('\n'),
    },
  },
};

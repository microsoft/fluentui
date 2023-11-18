import * as React from 'react';
import {
  useId,
  Button,
  Field,
  SpinButton,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
} from '@fluentui/react-components';

export const ToasterLimit = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [limit, setLimit] = React.useState(3);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Limited to 3 toasts</ToastTitle>
      </Toast>,
      { intent: 'success' },
    );

  return (
    <>
      <Field label="Toaster Limit">
        <SpinButton
          value={limit}
          onChange={(e, data) => {
            if (data.value) {
              setLimit(data.value);
            } else if (data.displayValue !== undefined) {
              const newValue = parseFloat(data.displayValue);
              if (!Number.isNaN(newValue)) {
                setLimit(newValue);
              }
            }
          }}
        />
      </Field>
      <br />
      <Toaster toasterId={toasterId} limit={limit} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

ToasterLimit.parameters = {
  docs: {
    description: {
      story: [
        'Use the `limit` prop on the `Toaster` to define the maximum number of toasts that can be rendered',
        'at any one time. Any extra toasts will be queued and rendered when a toast has been dismissed.',
      ].join('\n'),
    },
  },
};

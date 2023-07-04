import * as React from 'react';
import {
  useId,
  Button,
  Link,
  SpinButton,
  Field,
  Toaster,
  useToastController,
  ToastTitle,
  Toast,
  ToastTrigger,
} from '@fluentui/react-components';

export const CustomTimeout = () => {
  const [timeout, setDismissTimeout] = React.useState(1000);
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle
          action={
            <ToastTrigger>
              <Link>Dismiss</Link>
            </ToastTrigger>
          }
        >
          {timeout >= 0 ? `Custom timeout ${timeout}ms` : `Dismiss manually`}
        </ToastTitle>
      </Toast>,
      { timeout, intent: 'info' },
    );

  return (
    <>
      <Field label="Timeout" hint="Timeout is in milliseconds">
        <SpinButton
          value={timeout}
          onChange={(e, data) => {
            if (data.value) {
              setDismissTimeout(data.value);
            } else if (data.displayValue !== undefined) {
              const newValue = parseFloat(data.displayValue);
              if (!Number.isNaN(newValue)) {
                setDismissTimeout(newValue);
              }
            }
          }}
        />
      </Field>
      <br />
      <Toaster toasterId={toasterId} />
      <Button onClick={notify}>Make toast</Button>
    </>
  );
};

CustomTimeout.parameters = {
  docs: {
    description: {
      story: [
        'The timeout of toasts can be customized in milliseconds. Using a negative timeout value results in the toast',
        'never being auto-dismissed.',
      ].join('\n'),
    },
  },
};

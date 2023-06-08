import * as React from 'react';
import {
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastStatus,
} from '@fluentui/react-toast';
import { useId, Link, Button, Text } from '@fluentui/react-components';

export const ToastLifecycle = () => {
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [status, setStatus] = React.useState<ToastStatus>('removed');
  const toastExists = status !== 'removed';
  const notify = () => {
    if (toastExists) {
      return;
    }

    dispatchToast(
      <Toast>
        <ToastTitle intent="success" action={<Link>Undo</Link>}>
          Email sent
        </ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      { onStatusChange: toastStatus => setStatus(toastStatus) },
    );
  };

  return (
    <>
      <div>
        <Text role="status">
          Current status: <Text weight="bold">{status}</Text>
        </Text>
      </div>
      <Toaster toasterId={toasterId} />
      <Button disabledFocusable={toastExists} onClick={notify}>
        Make toast
      </Button>
    </>
  );
};

ToastLifecycle.parameters = {
  docs: {
    description: {
      story: [
        'Since toasts are imperative, the way they are mapped to React is internal, and not reflective of its usage.',
        'The Toast API exposes its own lifecycle that users can hook into, and is already used in other',
        'documentation examples. The lifecycle stages are:',
        '',
        '- added - The toast is queued until it can be made visible',
        '- visible - The toast is mounted and rendered, this is instance if the toast limit is not reached',
        '- closed - The toast is visually invisible but still mounted',
        '- removed - The toast has been completely unmounted and no longer exists',
        '- updated - The toast has been updated',
        '',
        'Use the `onStatusChange` option when dispatching a toast to listen to lifecycle changes.',
      ].join('\n'),
    },
  },
};

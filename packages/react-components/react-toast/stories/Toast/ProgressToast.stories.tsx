import * as React from 'react';
import {
  useId,
  Link,
  Button,
  ProgressBar,
  Text,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
  ToastTrigger,
} from '@fluentui/react-components';

const intervalDelay = 100;
const intervalIncrement = 5;

const DownloadProgressBar: React.FC<{ onDownloadEnd: () => void }> = ({ onDownloadEnd }) => {
  const [value, setValue] = React.useState(100);
  // This effect simulates progress value based on state/remote data
  React.useEffect(() => {
    if (value > 0) {
      const timeout = setTimeout(() => {
        setValue(v => Math.max(v - intervalIncrement, 0));
      }, intervalDelay);

      return () => clearTimeout(timeout);
    }

    if (value === 0) {
      onDownloadEnd();
    }
  }, [value, onDownloadEnd]);

  return <ProgressBar value={value} max={100} />;
};

export const ProgressToast = () => {
  const toasterId = useId('toaster');
  const toastId = useId('toast');
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const dismiss = React.useCallback(() => dismissToast(toastId), [dismissToast, toastId]);

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
          Downloading file
        </ToastTitle>
        <ToastBody>
          <Text>This may take a while</Text>
          <DownloadProgressBar onDownloadEnd={dismiss} />
        </ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      {
        intent: 'success',
        timeout: -1,
        toastId,
        onStatusChange: (e, { status }) => setUnmounted(status === 'unmounted'),
      },
    );

  return (
    <>
      <Toaster toasterId={toasterId} />
      <Button disabledFocusable={!unmounted} onClick={notify}>
        Make toast
      </Button>
    </>
  );
};

ProgressToast.parameters = {
  docs: {
    description: {
      story: [
        'In order to avoid excessive toast updates and optimize performance, we recommend encapsulating',
        'progress bars with any state or remove data sources. That way the progress bar can tick independently',
        'and trigger the toast dismiss when it finishes. You can pass a callback to your toast content',
        'to dismiss to the toast based on any side effects.',
      ].join('\n'),
    },
  },
};

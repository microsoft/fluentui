import * as React from 'react';
import type { JSXElement, ToastStatus } from '@fluentui/react-components';
import {
  useId,
  Link,
  Button,
  Text,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
} from '@fluentui/react-components';

import styles from './ToastLifecycle.module.css';

export const ToastLifecycle = (): JSXElement => {
  const toasterId = useId('toaster');
  const labelId = useId();
  const { dispatchToast } = useToastController(toasterId);
  const [statusLog, setStatusLog] = React.useState<[number, ToastStatus][]>([]);
  const [dismissed, setDismissed] = React.useState(true);
  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle action={<Link>Undo</Link>}>Email sent</ToastTitle>
        <ToastBody subtitle="Subtitle">This is a toast body</ToastBody>
        <ToastFooter>
          <Link>Action</Link>
          <Link>Action</Link>
        </ToastFooter>
      </Toast>,
      {
        timeout: 1000,
        intent: 'success',
        onStatusChange: (e, { status: toastStatus }) => {
          setDismissed(toastStatus === 'unmounted');
          setStatusLog(prev => [[Date.now(), toastStatus], ...prev]);
        },
      },
    );
  };

  return (
    <>
      <div className={styles.root}>
        <div>
          <Button className={styles.button} disabledFocusable={!dismissed} onClick={notify}>
            Make toast
          </Button>
          <Button className={styles.button} onClick={() => setStatusLog([])}>
            Clear log
          </Button>
        </div>
        <div className={styles.logContainer}>
          <div className={styles.logLabel} id={labelId}>
            Status log
          </div>
          <div role="log" aria-labelledby={labelId} className={styles.log}>
            {statusLog.map(([time, toastStatus], i) => {
              const date = new Date(time);
              return (
                <div key={i}>
                  {date.toLocaleTimeString()} <Text weight="bold">{toastStatus}</Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Toaster toasterId={toasterId} />
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
        '- queued - The toast is queued until it can be made visible',
        '- visible - The toast is mounted and rendered, this is instance if the toast limit is not reached',
        '- dismissed - The toast is visually invisible but still mounted',
        '- unounted - The toast has been completely unmounted and no longer exists',
        '',
        'Use the `onStatusChange` option when dispatching a toast to listen to lifecycle changes.',
      ].join('\n'),
    },
  },
};

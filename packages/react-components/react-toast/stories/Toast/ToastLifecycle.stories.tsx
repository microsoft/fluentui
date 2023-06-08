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
import { useId, Link, Button, Text, makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...shorthands.gap('20px'),
  },

  button: {
    display: 'block',
  },

  log: {
    boxShadow: tokens.shadow16,
    position: 'relative',
    minWidth: '200px',
    minHeight: '200px',
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
    ...shorthands.padding('12px', '12px'),
    '::after': {
      content: `'Status log'`,
      position: 'absolute',
      ...shorthands.padding('1px', '4px', '1px'),
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const ToastLifecycle = () => {
  const styles = useStyles();
  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const [statusLog, setStatusLog] = React.useState<[number, ToastStatus][]>([]);
  const [dismissed, setDismissed] = React.useState(true);
  const notify = () => {
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
      {
        onStatusChange: toastStatus => {
          setDismissed(toastStatus === 'unmounted');
          setStatusLog(prev => [...prev, [Date.now(), toastStatus]]);
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
        <div role="log" className={styles.log}>
          {statusLog.map(([time, toastStatus]) => {
            const date = new Date(time);
            return (
              <div key={time}>
                {date.toLocaleTimeString()} <Text weight="bold">{toastStatus}</Text>
              </div>
            );
          })}
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

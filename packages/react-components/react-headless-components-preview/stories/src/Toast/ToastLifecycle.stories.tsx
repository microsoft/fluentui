import * as React from 'react';
import {
  Toast,
  Toaster,
  ToastTitle,
  ToastBody,
  ToastFooter,
  useToastController,
} from '@fluentui/react-headless-components-preview/toast';
import type { ToastStatus } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const ToastLifecycle = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);
  const [statusLog, setStatusLog] = React.useState<[number, ToastStatus][]>([]);
  const [dismissed, setDismissed] = React.useState(true);

  const notify = () => {
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentSuccess}`}>
        <ToastTitle
          className={styles.title}
          action={
            <button type="button" className={styles.actionBtn}>
              Undo
            </button>
          }
        >
          Email sent
        </ToastTitle>
        <ToastBody subtitle={<span className={styles.subtitle}>Subtitle</span>} className={styles.bodyText}>
          This is a toast body
        </ToastBody>
        <ToastFooter className={styles.footer}>
          <button type="button" className={styles.actionBtn}>
            Action
          </button>
          <button type="button" className={styles.actionBtn}>
            Action
          </button>
        </ToastFooter>
      </Toast>,
      {
        timeout: 1000,
        intent: 'success',
        onStatusChange: (_, { status: toastStatus }) => {
          setDismissed(toastStatus === 'unmounted');
          setStatusLog(prev => [[Date.now(), toastStatus], ...prev]);
        },
      },
    );
  };

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <div className={styles.logContainer}>
        <div className={styles.logSection}>
          <button type="button" disabled={!dismissed} className={styles.triggerBtn} onClick={notify}>
            Make toast
          </button>
          <button type="button" className={styles.triggerBtn} onClick={() => setStatusLog([])}>
            Clear log
          </button>
        </div>
        <div className={styles.logViewer}>
          <div className={styles.logHeader}>Status log</div>
          <div role="log" aria-label="Toast status log" className={styles.logContent}>
            {statusLog.map(([time, status], i) => {
              const date = new Date(time);
              return (
                <div key={i}>
                  {date.toLocaleTimeString()} <strong>{status}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

ToastLifecycle.parameters = {
  docs: {
    description: {
      story: [
        'The `onStatusChange` callback reports each lifecycle transition of a toast.',
        'Possible statuses: `queued`, `visible`, `hidden`, `unmounted`.',
      ].join('\n'),
    },
  },
};

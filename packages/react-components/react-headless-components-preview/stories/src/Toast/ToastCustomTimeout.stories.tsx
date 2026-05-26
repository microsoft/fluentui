import * as React from 'react';
import {
  Toast,
  Toaster,
  ToastTitle,
  useToastController,
  useToastContainerContext,
} from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

const DismissButton = ({ children }: { children: React.ReactNode }) => {
  const { close } = useToastContainerContext();
  return (
    <button type="button" className={styles.dismissBtn} onClick={close}>
      {children}
    </button>
  );
};

export const CustomTimeout = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);
  const [timeout, setDismissTimeout] = React.useState(1000);

  const notify = () =>
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentInfo}`}>
        <ToastTitle className={styles.title} action={<DismissButton>Dismiss</DismissButton>}>
          {timeout >= 0 ? `Custom timeout ${timeout} ms` : 'Dismiss manually'}
        </ToastTitle>
      </Toast>,
      { timeout, intent: 'info' },
    );

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <div className={styles.controls}>
        <label className={styles.timeoutInput}>
          Timeout (ms)
          <input type="number" value={timeout} onChange={e => setDismissTimeout(Number(e.target.value))} />
          <span className={styles.timeoutInputHint}>Use a negative value to prevent auto-dismiss.</span>
        </label>
        <button type="button" className={styles.triggerBtn} onClick={notify}>
          Make toast
        </button>
      </div>
    </>
  );
};

CustomTimeout.parameters = {
  docs: {
    description: {
      story: [
        'Pass `timeout` (ms) to `dispatchToast` to control how long a toast stays visible.',
        'A negative value disables auto-dismiss — the user must close the toast manually.',
      ].join('\n'),
    },
  },
};

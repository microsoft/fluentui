import * as React from 'react';
import {
  Toast,
  Toaster,
  ToastTitle,
  ToastBody,
  ToastFooter,
  useToastController,
  useToastContainerContext,
} from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

const intervalDelay = 100;
const intervalIncrement = 5;

const DismissButton = ({ children }: { children: React.ReactNode }) => {
  const { close } = useToastContainerContext();
  return (
    <button type="button" className={styles.dismissBtn} onClick={close}>
      {children}
    </button>
  );
};

const DownloadProgressBar: React.FC<{ onDownloadEnd: () => void }> = ({ onDownloadEnd }) => {
  const [value, setValue] = React.useState(100);

  React.useEffect(() => {
    if (value > 0) {
      const id = setTimeout(() => setValue(v => Math.max(v - intervalIncrement, 0)), intervalDelay);
      return () => clearTimeout(id);
    }
    if (value === 0) {
      onDownloadEnd();
    }
  }, [value, onDownloadEnd]);

  return <progress value={value} max={100} className={styles.progressBar} />;
};

export const ProgressToast = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `progress-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const dismiss = React.useCallback(() => dismissToast(toastId), [dismissToast, toastId]);

  const notify = () =>
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentSuccess}`}>
        <ToastTitle className={styles.title} action={<DismissButton>Dismiss</DismissButton>}>
          Downloading file
        </ToastTitle>
        <ToastBody className={styles.body}>
          <p className={styles.bodyText}>This may take a while</p>
          <DownloadProgressBar onDownloadEnd={dismiss} />
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
        intent: 'success',
        timeout: -1,
        toastId,
        onStatusChange: (_, { status }) => setUnmounted(status === 'unmounted'),
      },
    );

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <button type="button" disabled={!unmounted} className={styles.triggerBtn} onClick={notify}>
        Make toast
      </button>
    </>
  );
};

ProgressToast.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can host arbitrary content — here a CSS progress bar is rendered inside a toast.',
        'The toast uses `timeout: -1` so it never auto-dismisses; the progress bar calls',
        '`dismissToast` imperatively once it completes.',
      ].join('\n'),
    },
  },
};

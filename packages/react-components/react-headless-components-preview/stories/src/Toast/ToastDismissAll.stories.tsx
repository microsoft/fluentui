import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const DismissAll = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast, dismissAllToasts } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentInfo}`}>
        <ToastTitle className={styles.title}>This is a toast</ToastTitle>
      </Toast>,
      { intent: 'info' },
    );

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <div className={styles.demoRow}>
        <button type="button" className={styles.triggerBtn} onClick={notify}>
          Make toast
        </button>
        <button type="button" className={styles.triggerBtn} onClick={() => dismissAllToasts()}>
          Dismiss all toasts
        </button>
      </div>
    </>
  );
};

DismissAll.parameters = {
  docs: {
    description: {
      story: 'The `dismissAllToasts` imperative API dismisses all rendered toasts at once.',
    },
  },
};

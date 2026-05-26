import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const PauseOnHover = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentInfo}`}>
        <ToastTitle className={styles.title}>Hover me!</ToastTitle>
      </Toast>,
      { pauseOnHover: true, intent: 'info' },
    );

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <button type="button" className={styles.triggerBtn} onClick={notify}>
        Make toast
      </button>
    </>
  );
};

PauseOnHover.parameters = {
  docs: {
    description: {
      story: [
        'Pass `pauseOnHover: true` to `dispatchToast` to pause the dismiss timer while the',
        'mouse cursor is inside the toast. The timer resumes when the cursor leaves.',
      ].join('\n'),
    },
  },
};

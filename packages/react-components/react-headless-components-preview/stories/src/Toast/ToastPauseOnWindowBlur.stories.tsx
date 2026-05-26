import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const PauseOnWindowBlur = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentInfo}`}>
        <ToastTitle className={styles.title}>Click on another window!</ToastTitle>
      </Toast>,
      { pauseOnWindowBlur: true, intent: 'info' },
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

PauseOnWindowBlur.parameters = {
  docs: {
    description: {
      story: [
        'Pass `pauseOnWindowBlur: true` to `dispatchToast` to pause the dismiss timer when',
        'the user switches to another window. The timer resumes when the window regains focus.',
      ].join('\n'),
    },
  },
};

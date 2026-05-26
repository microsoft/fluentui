import * as React from 'react';
import {
  Toaster,
  ToastTitle,
  ToastBody,
  ToastFooter,
  useToastController,
  Toast,
} from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const Default = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
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
        <ToastBody subtitle={{ className: styles.subtitle, children: 'Subtitle' }} className={styles.bodyText}>
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
      { intent: 'success', timeout: 10_000 },
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

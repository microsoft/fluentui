import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const DismissToast = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `dismiss-example-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, dismissToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentSuccess}`}>
        <ToastTitle className={styles.title}>This is a toast</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (_, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <button type="button" className={styles.triggerBtn} onClick={unmounted ? notify : () => dismissToast(toastId)}>
        {unmounted ? 'Make' : 'Dismiss'} toast
      </button>
    </>
  );
};

DismissToast.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can be dismissed imperatively with `dismissToast`. Provide a `toastId` when dispatching',
        'so you can reference the same toast later. Use `onStatusChange` to track when the toast is',
        'fully removed (`status === "unmounted"`).',
      ].join('\n'),
    },
  },
};

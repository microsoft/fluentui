import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const UpdateToast = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `update-example-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const { dispatchToast, updateToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentWarning}`}>
        <ToastTitle className={styles.title}>This toast never closes</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'warning',
        timeout: -1,
        onStatusChange: (_, { status }) => setUnmounted(status === 'unmounted'),
      },
    );
    setUnmounted(false);
  };

  const update = () =>
    updateToast({
      content: (
        <Toast className={`${styles.toast} ${styles.intentSuccess}`}>
          <ToastTitle className={styles.title}>This toast will close soon</ToastTitle>
        </Toast>
      ),
      intent: 'success',
      toastId,
      timeout: 2000,
    });

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <button type="button" className={styles.triggerBtn} onClick={unmounted ? notify : update}>
        {unmounted ? 'Make toast' : 'Update toast'}
      </button>
    </>
  );
};

UpdateToast.parameters = {
  docs: {
    description: {
      story: [
        'Use the `updateToast` imperative API to change a visible toast. You **must** provide a',
        '`toastId` when dispatching. Almost all options — content, intent, timeout — can be updated.',
      ].join('\n'),
    },
  },
};

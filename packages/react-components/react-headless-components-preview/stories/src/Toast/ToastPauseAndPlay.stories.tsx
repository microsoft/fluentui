import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const PauseAndPlay = (): React.ReactNode => {
  const toasterId = React.useId();
  const toastId = `pause-play-${toasterId}`;
  const [unmounted, setUnmounted] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const { pauseToast, playToast, dispatchToast } = useToastController(toasterId);

  const notify = () => {
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentSuccess}`}>
        <ToastTitle className={styles.title}>This is a toast</ToastTitle>
      </Toast>,
      {
        toastId,
        intent: 'success',
        onStatusChange: (_, { status }) => {
          setUnmounted(status === 'unmounted');
          setPaused(false);
        },
      },
    );
    setUnmounted(false);
  };

  const toggle = () => {
    if (paused) {
      playToast(toastId);
      setPaused(false);
    } else {
      pauseToast(toastId);
      setPaused(true);
    }
  };

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <div className={styles.demoRow}>
        <button type="button" disabled={!unmounted} className={styles.triggerBtn} onClick={notify}>
          Make toast
        </button>
        <button type="button" disabled={unmounted} className={styles.triggerBtn} onClick={toggle}>
          {paused ? '▶ Play' : '⏸ Pause'} toast
        </button>
      </div>
    </>
  );
};

PauseAndPlay.parameters = {
  docs: {
    description: {
      story: [
        'Use `pauseToast` and `playToast` from `useToastController` to imperatively pause and',
        'resume the dismiss timer. Both require the `toastId` used when dispatching.',
      ].join('\n'),
    },
  },
};

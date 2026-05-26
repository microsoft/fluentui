import * as React from 'react';
import {
  Toast,
  Toaster,
  ToastTitle,
  useToastController,
  useToastContainerContext,
} from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

/**
 * A dismiss button that reads `close` from `ToastContainerContext`.
 * This is the headless equivalent of the styled layer's `ToastTrigger`.
 */
const DismissButton = ({ children }: { children: React.ReactNode }) => {
  const { close } = useToastContainerContext();
  return (
    <button type="button" className={styles.dismissBtn} onClick={close}>
      {children}
    </button>
  );
};

export const DismissToastWithAction = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);

  const notify = () =>
    dispatchToast(
      <Toast className={`${styles.toast} ${styles.intentSuccess}`}>
        <ToastTitle className={styles.title} action={<DismissButton>Dismiss</DismissButton>}>
          Dismiss me
        </ToastTitle>
      </Toast>,
      { intent: 'success' },
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

DismissToastWithAction.parameters = {
  docs: {
    description: {
      story: [
        'Use `useToastContainerContext()` to access `close` inside the dispatched content.',
        'Calling it closes the toast — this is the headless equivalent of the styled',
        "layer's `ToastTrigger` component.",
      ].join('\n'),
    },
  },
};

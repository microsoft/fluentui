import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

export const MultipleToasters = (): React.ReactNode => {
  const firstId = React.useId();
  const secondId = React.useId();
  const [toaster, setToaster] = React.useState<'first' | 'second'>('first');
  const { dispatchToast: dispatchFirst } = useToastController(firstId);
  const { dispatchToast: dispatchSecond } = useToastController(secondId);

  const notify = () => {
    if (toaster === 'first') {
      dispatchFirst(
        <Toast className={`${styles.toast} ${styles.intentInfo}`}>
          <ToastTitle className={styles.title}>First toaster</ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    } else {
      dispatchSecond(
        <Toast className={`${styles.toast} ${styles.intentInfo}`}>
          <ToastTitle className={styles.title}>Second toaster</ToastTitle>
        </Toast>,
        { intent: 'info' },
      );
    }
  };

  return (
    <>
      <Toaster className={styles.toaster} toasterId={firstId} />
      <Toaster className={styles.toaster} toasterId={secondId} />
      <div className={styles.controls}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Choose toaster</legend>
          <div className={styles.options}>
            <label className={styles.optionLabel}>
              <input type="radio" name="toaster" checked={toaster === 'first'} onChange={() => setToaster('first')} />
              First toaster
            </label>
            <label className={styles.optionLabel}>
              <input type="radio" name="toaster" checked={toaster === 'second'} onChange={() => setToaster('second')} />
              Second toaster
            </label>
          </div>
        </fieldset>
        <button type="button" className={styles.triggerBtn} onClick={notify}>
          Make toast
        </button>
      </div>
    </>
  );
};

MultipleToasters.parameters = {
  docs: {
    description: {
      story: [
        '> ⚠️ This use case is **not recommended** for most applications.',
        '',
        'Pass a `toasterId` to each `Toaster` and to `useToastController` to support multiple',
        'independent Toasters on the same page.',
      ].join('\n'),
    },
  },
};

import * as React from 'react';
import { Toast, Toaster, ToastTitle, useToastController } from '@fluentui/react-headless-components-preview/toast';
import type { ToastIntent } from '@fluentui/react-headless-components-preview/toast';
import styles from './toast.module.css';

const intentIcon: Record<string, string> = {
  success: '✓',
  info: 'i',
  warning: '⚠',
  error: '✕',
};

const getIconBadgeClass = (intent: ToastIntent): string => {
  switch (intent) {
    case 'success':
      return `${styles.iconBadge} ${styles.iconBadgeSuccess}`;
    case 'info':
      return `${styles.iconBadge} ${styles.iconBadgeInfo}`;
    case 'warning':
      return `${styles.iconBadge} ${styles.iconBadgeWarning}`;
    case 'error':
      return `${styles.iconBadge} ${styles.iconBadgeError}`;
    default:
      return styles.iconBadge;
  }
};

const getIntentClass = (intent: ToastIntent): string => {
  switch (intent) {
    case 'success':
      return `${styles.toast} ${styles.intentSuccess}`;
    case 'info':
      return `${styles.toast} ${styles.intentInfo}`;
    case 'warning':
      return `${styles.toast} ${styles.intentWarning}`;
    case 'error':
      return `${styles.toast} ${styles.intentError}`;
    default:
      return styles.toast;
  }
};

export const Intent = (): React.ReactNode => {
  const toasterId = React.useId();
  const { dispatchToast } = useToastController(toasterId);
  const [intent, setIntent] = React.useState<ToastIntent>('success');

  const notify = () =>
    dispatchToast(
      <Toast className={getIntentClass(intent)}>
        <ToastTitle
          className={styles.title}
          media={{ className: getIconBadgeClass(intent), children: intentIcon[intent] }}
        >
          Toast intent: {intent}
        </ToastTitle>
      </Toast>,
      { intent },
    );

  return (
    <>
      <Toaster className={styles.toaster} toasterId={toasterId} />
      <div className={styles.controls}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Intent</legend>
          <div className={styles.options}>
            {(['success', 'info', 'warning', 'error'] as ToastIntent[]).map(i => (
              <label key={i} className={styles.optionLabel}>
                <input type="radio" name="intent" value={i} checked={intent === i} onChange={() => setIntent(i)} />
                {i}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="button" className={styles.triggerBtn} onClick={notify}>
          Make toast
        </button>
      </div>
    </>
  );
};

Intent.parameters = {
  docs: {
    description: {
      story: [
        'The four standard intents — `success`, `info`, `warning`, `error` — are passed as a',
        '`dispatchToast` option. The `intent` value is forwarded to `ToastContext` so that',
        '`ToastTitle` can conditionally render the `media` slot. Fill that slot with any icon',
        'component you like; here we use a plain coloured `<span>`.',
      ].join('\n'),
    },
  },
};

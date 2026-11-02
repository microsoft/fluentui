import * as React from 'react';
import type { ToastPosition } from '@fluentui/react-headless-components-preview/toast';
import { Toaster, useToastController, ToastTitle, Toast } from '@fluentui/react-headless-components-preview/toast';

import toastStyles from './toast.module.css';

export const Positions = (): React.ReactElement => {
  const toasterId = 'toaster-positions';
  const { dispatchToast } = useToastController(toasterId);
  const [position, setPosition] = React.useState<ToastPosition>('top');
  const positions: ToastPosition[] = ['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end'];

  const notify = () =>
    dispatchToast(
      <Toast className={`${toastStyles.toast} ${toastStyles.intentSuccess}`}>
        <ToastTitle className={toastStyles.title}>This toast is {position}</ToastTitle>
      </Toast>,
      { position, intent: 'success' },
    );

  return (
    <>
      <Toaster className={toastStyles.toaster} toasterId={toasterId} />
      <div className={toastStyles.controls}>
        <fieldset className={toastStyles.fieldset}>
          <legend className={toastStyles.legend}>Select a position</legend>
          <div className={toastStyles.options}>
            {positions.map(value => (
              <label key={value} className={toastStyles.optionLabel}>
                <input
                  type="radio"
                  name="position"
                  value={value}
                  checked={position === value}
                  onChange={() => setPosition(value)}
                />
                {value}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="button" className={toastStyles.triggerBtn} onClick={notify}>
          Make toast
        </button>
      </div>
    </>
  );
};

Positions.parameters = {
  docs: {
    description: {
      story: [
        'Toasts can be dispatched to all supported page positions, including the top and bottom center placements.',
        'We do not recommend to use more than one',
        'position for toasts in an application because that could be disorienting for users. Pick',
        'one desired position and configure it in the `Toaster`.',
      ].join('\n'),
    },
  },
};

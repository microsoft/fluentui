import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SpinnerSlots, SpinnerState } from './Spinner.types';
import styles from './Spinner.module.css';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  spinnerTail: 'fui-Spinner__spinnerTail',
  label: 'fui-Spinner__label',
};

/**
 * Apply styling to the Spinner slots based on the state.
 */
export const useSpinnerStyles = (state: SpinnerState): SpinnerState => {
  state.root.className = clsx(spinnerClassNames.root, styles.root, state.root.className);

  if (state.spinner) {
    state.spinner.className = clsx(spinnerClassNames.spinner, styles.spinner, state.spinner.className);
  }

  if (state.spinnerTail) {
    state.spinnerTail.className = clsx(spinnerClassNames.spinnerTail, styles.spinnerTail, state.spinnerTail.className);
  }

  if (state.label) {
    state.label.className = clsx(spinnerClassNames.label, styles.label, state.label.className);
  }

  return state;
};

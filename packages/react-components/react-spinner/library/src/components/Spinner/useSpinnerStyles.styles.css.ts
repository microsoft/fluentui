'use client';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';
import styles from './Spinner.module.css';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  spinnerTail: 'fui-Spinner__spinnerTail',
  label: 'fui-Spinner__label',
};

export const useSpinnerStyles_unstable = (state: SpinnerState): SpinnerState => {
  const { dir } = useFluent();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    spinnerClassNames.root,
    styles.root,
    styles[state.labelPosition],
    styles[state.size],
    styles[state.appearance],
    state.root.className,
  );
  if (state.spinner) {
    // eslint-disable-next-line react-hooks/immutability
    state.spinner.className = clsx(spinnerClassNames.spinner, styles.spinner, state.spinner.className);
  }
  if (state.spinnerTail) {
    // eslint-disable-next-line react-hooks/immutability
    state.spinnerTail.className = clsx(
      spinnerClassNames.spinnerTail,
      styles.spinnerTail,
      dir === 'rtl' && styles.rtlTail,
      state.spinnerTail.className,
    );
  }
  if (state.label) {
    // eslint-disable-next-line react-hooks/immutability
    state.label.className = clsx(spinnerClassNames.label, styles.label, state.label.className);
  }
  return state;
};

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ProgressBarSlots, ProgressBarState } from './ProgressBar.types';
import styles from './ProgressBar.module.css';

export const progressBarClassNames: SlotClassNames<Omit<ProgressBarSlots, 'indeterminateMotion'>> = {
  root: 'fui-ProgressBar',
  bar: 'fui-ProgressBar__bar',
};

/**
 * Apply styling to the ProgressBar slots based on the state.
 */
export const useProgressBarStyles = (state: ProgressBarState): ProgressBarState => {
  state.root.className = clsx(progressBarClassNames.root, styles.root, state.root.className);

  if (state.bar) {
    state.bar.className = clsx(progressBarClassNames.bar, styles.bar, state.bar.className);
  }

  return state;
};

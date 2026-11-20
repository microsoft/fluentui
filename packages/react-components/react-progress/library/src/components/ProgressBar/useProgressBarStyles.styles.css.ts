import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ProgressBarState, ProgressBarSlots } from './ProgressBar.types';
import styles from './ProgressBar.module.css';

export const progressBarClassNames: SlotClassNames<Omit<ProgressBarSlots, 'indeterminateMotion'>> = {
  root: 'fui-ProgressBar',
  bar: 'fui-ProgressBar__bar',
};

export const useProgressBarStyles_unstable = (state: ProgressBarState): ProgressBarState => {
  const { color, max, shape, thickness, value } = state;
  state.root.className = clsx(
    progressBarClassNames.root,
    styles.root,
    styles[shape],
    styles[thickness],
    state.root.className,
  );
  if (state.bar) {
    state.bar.className = clsx(
      progressBarClassNames.bar,
      styles.bar,
      value === undefined && styles.indeterminate,
      value !== undefined && value > 0.01 && styles.nonZeroDeterminate,
      value !== undefined && color && styles[color],
      state.bar.className,
    );
    if (value !== undefined) {
      state.bar.style = { width: Math.min(100, Math.max(0, (value / max) * 100)) + '%', ...state.bar.style };
    }
  }
  return state;
};

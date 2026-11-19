'use client';

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';
import styles from './ToolbarToggleButton.module.css';

export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  useToggleButtonStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(state.checked && styles.checked, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(state.checked && styles.checkedIcon, state.icon.className);
  }

  return state;
};

'use client';

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';
import styles from './ToolbarRadioButton.module.css';

export const useToolbarRadioButtonStyles_unstable = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  useToggleButtonStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(state.checked && styles.checked, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(state.checked && styles.checkedIcon, state.icon.className);
  }

  return state;
};

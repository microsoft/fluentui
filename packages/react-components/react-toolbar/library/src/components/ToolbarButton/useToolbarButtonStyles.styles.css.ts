'use client';

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarButtonState } from './ToolbarButton.types';
import styles from './ToolbarButton.module.css';

export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState): void => {
  useButtonStyles_unstable(state);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(state.vertical && styles.vertical, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(state.vertical && styles.verticalIcon, state.icon.className);
  }
};

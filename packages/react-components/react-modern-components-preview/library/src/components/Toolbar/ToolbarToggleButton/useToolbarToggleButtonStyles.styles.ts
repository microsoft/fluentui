'use client';

import clsx from 'clsx';
import { toggleButtonClassNames, useToggleButtonStyles } from '../../ToggleButton/useToggleButtonStyles.styles';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';
import styles from './ToolbarToggleButton.module.css';

export const toolbarToggleButtonClassNames = toggleButtonClassNames;

export const useToolbarToggleButtonStyles = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  useToggleButtonStyles(state);

  return state;
};

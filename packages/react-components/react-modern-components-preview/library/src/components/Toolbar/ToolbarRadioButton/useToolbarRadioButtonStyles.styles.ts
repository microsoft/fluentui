'use client';

import clsx from 'clsx';
import { toggleButtonClassNames, useToggleButtonStyles } from '../../ToggleButton/useToggleButtonStyles.styles';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';
import styles from './ToolbarRadioButton.module.css';

export const toolbarRadioButtonClassNames = toggleButtonClassNames;

export const useToolbarRadioButtonStyles = (state: ToolbarRadioButtonState): ToolbarRadioButtonState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  useToggleButtonStyles(state);

  return state;
};

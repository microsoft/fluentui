'use client';

import clsx from 'clsx';
import { buttonClassNames, useButtonStyles } from '../../Button/useButtonStyles.styles';
import type { ToolbarButtonState } from './ToolbarButton.types';
import styles from './ToolbarButton.module.css';

export const toolbarButtonClassNames = buttonClassNames;

export const useToolbarButtonStyles = (state: ToolbarButtonState): ToolbarButtonState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, state.root.className);

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  useButtonStyles(state);

  return state;
};

'use client';

import { clsx } from 'clsx';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { ToolbarDividerState } from './ToolbarDivider.types';
import styles from './ToolbarDivider.module.css';

export const useToolbarDividerStyles_unstable = (state: ToolbarDividerState): ToolbarDividerState => {
  useDividerStyles_unstable(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, !state.vertical && styles.horizontal, state.root.className);
  return state;
};

'use client';

import clsx from 'clsx';
import { dividerClassNames, useDividerStyles } from '../../Divider/useDividerStyles.styles';
import type { ToolbarDividerState } from './ToolbarDivider.types';
import styles from './ToolbarDivider.module.css';

export const toolbarDividerClassNames = dividerClassNames;

export const useToolbarDividerStyles = (state: ToolbarDividerState): ToolbarDividerState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(styles.root, state.root.className);
  useDividerStyles(state);

  return state;
};

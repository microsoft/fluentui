import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToolbarSlots, ToolbarState } from './Toolbar.types';
import styles from './Toolbar.module.css';

export const toolbarClassNames: SlotClassNames<ToolbarSlots> = {
  root: 'fui-Toolbar',
};

export const useToolbarStyles = (state: ToolbarState): ToolbarState => {
  state.root.className = clsx(toolbarClassNames.root, styles.root, state.root.className);

  return state;
};

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToolbarState, ToolbarSlots } from './Toolbar.types';
import styles from './Toolbar.module.css';

export const toolbarClassNames: SlotClassNames<ToolbarSlots> = {
  root: 'fui-Toolbar',
};

export const useToolbarStyles_unstable = (state: ToolbarState): ToolbarState => {
  state.root.className = clsx(
    toolbarClassNames.root,
    styles.root,
    state.vertical && styles.vertical,
    styles[state.size],
    state.root.className,
  );
  return state;
};

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToolbarGroupState, ToolbarGroupSlots } from './ToolbarGroup.types';
import styles from './ToolbarGroup.module.css';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  state.root.className = clsx(
    toolbarGroupClassNames.root,
    styles.root,
    state.vertical && styles.vertical,
    state.root.className,
  );
  return state;
};

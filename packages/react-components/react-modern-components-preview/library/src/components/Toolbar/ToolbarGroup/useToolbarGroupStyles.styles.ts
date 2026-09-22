import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToolbarGroupSlots, ToolbarGroupState } from './ToolbarGroup.types';
import styles from './ToolbarGroup.module.css';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

export const useToolbarGroupStyles = (state: ToolbarGroupState): ToolbarGroupState => {
  state.root.className = clsx(toolbarGroupClassNames.root, styles.root, state.root.className);

  return state;
};

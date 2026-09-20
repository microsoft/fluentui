import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupSlots, ToolbarRadioGroupState } from './ToolbarRadioGroup.types';
import styles from './ToolbarRadioGroup.module.css';

export const toolbarRadioGroupClassNames: SlotClassNames<ToolbarRadioGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

export const useToolbarRadioGroupStyles = (state: ToolbarRadioGroupState): ToolbarRadioGroupState => {
  state.root.className = clsx(toolbarRadioGroupClassNames.root, styles.root, state.root.className);

  return state;
};

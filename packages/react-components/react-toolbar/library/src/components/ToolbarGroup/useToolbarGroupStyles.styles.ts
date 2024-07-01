import { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { ToolbarGroupSlots, ToolbarGroupState } from './ToolbarGroup.types';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  'use no memo';

  state.root.className = mergeClasses(toolbarGroupClassNames.root, state.root.className);

  return state;
};

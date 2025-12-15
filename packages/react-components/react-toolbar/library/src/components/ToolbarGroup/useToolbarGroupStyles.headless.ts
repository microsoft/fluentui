'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';

import type { ToolbarGroupSlots, ToolbarGroupState } from './ToolbarGroup.types';

export const toolbarGroupClassNames: SlotClassNames<ToolbarGroupSlots> = {
  root: 'fui-ToolbarGroup',
};

/**
 * Apply styling to the Toolbar slots based on the state
 */
export const useToolbarGroupStyles_unstable = (state: ToolbarGroupState): ToolbarGroupState => {
  'use no memo';

  state.root.className = getComponentSlotClassName(toolbarGroupClassNames.root, state.root);

  return state;
};

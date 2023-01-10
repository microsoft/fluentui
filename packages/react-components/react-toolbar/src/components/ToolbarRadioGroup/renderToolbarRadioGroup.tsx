import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupState, ToolbarRadioGroupSlots } from './ToolbarRadioGroup.types';

/**
 * Render the final JSX of ToolbarRadioGroup
 */
export const renderToolbarRadioGroup_unstable = (state: ToolbarRadioGroupState) => {
  const { slots, slotProps } = getSlots<ToolbarRadioGroupSlots>(state);

  return <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>;
};

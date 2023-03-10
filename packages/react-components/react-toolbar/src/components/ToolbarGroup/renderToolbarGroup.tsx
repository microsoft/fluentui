import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarGroupState, ToolbarGroupSlots } from './ToolbarGroup.types';

/**
 * Render the final JSX of ToolbarGroup
 */
export const renderToolbarGroup_unstable = (state: ToolbarGroupState) => {
  const { slots, slotProps } = getSlots<ToolbarGroupSlots>(state);

  return <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>;
};

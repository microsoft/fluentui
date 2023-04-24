/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToolbarGroupState, ToolbarGroupSlots } from './ToolbarGroup.types';

/**
 * Render the final JSX of ToolbarGroup
 */
export const renderToolbarGroup_unstable = (state: ToolbarGroupState) => {
  const { slots, slotProps } = getSlotsNext<ToolbarGroupSlots>(state);

  return <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>;
};

import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarDividerState, ToolbarDividerSlots } from './ToolbarDivider.types';

/**
 * Render the final JSX of ToolbarDivider
 */
export const renderToolbarDivider_unstable = (state: ToolbarDividerState) => {
  const { slots, slotProps } = getSlots<ToolbarDividerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

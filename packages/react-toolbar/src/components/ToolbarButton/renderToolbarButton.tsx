import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarButtonState, ToolbarButtonSlots } from './ToolbarButton.types';

/**
 * Render the final JSX of ToolbarButton
 */
export const renderToolbarButton_unstable = (state: ToolbarButtonState) => {
  const { slots, slotProps } = getSlots<ToolbarButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

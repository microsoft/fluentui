import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarState, ToolbarSlots } from './Toolbar.types';

/**
 * Render the final JSX of Toolbar
 */
export const renderToolbar_unstable = (state: ToolbarState) => {
  const { slots, slotProps } = getSlots<ToolbarSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

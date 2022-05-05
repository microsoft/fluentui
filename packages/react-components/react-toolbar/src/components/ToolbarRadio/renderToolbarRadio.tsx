import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarRadioState, ToolbarRadioSlots } from './ToolbarRadio.types';

/**
 * Render the final JSX of ToolbarRadio
 */
export const renderToolbarRadio_unstable = (state: ToolbarRadioState) => {
  const { slots, slotProps } = getSlots<ToolbarRadioSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

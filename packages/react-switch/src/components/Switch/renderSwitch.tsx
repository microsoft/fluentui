import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SwitchSlots, SwitchRender } from './Switch.types';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch_unstable: SwitchRender = state => {
  const { slots, slotProps } = getSlots<SwitchSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.track {...slotProps.track} />
      <slots.thumbWrapper {...slotProps.thumbWrapper}>
        <slots.thumb {...slotProps.thumb} />
      </slots.thumbWrapper>
      <slots.input {...slotProps.input} />
      <slots.activeRail {...slotProps.activeRail} />
    </slots.root>
  );
};

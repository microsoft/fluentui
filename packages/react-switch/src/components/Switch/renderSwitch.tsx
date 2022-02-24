import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SwitchState, SwitchSlots } from './Switch.types';

/**
 * Render a Switch component by passing the state defined props to the appropriate slots.
 */
export const renderSwitch_unstable = (state: SwitchState) => {
  const { slots, slotProps } = getSlots<SwitchSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      <slots.track {...slotProps.track} />
      <slots.thumb {...slotProps.thumb} />
    </slots.root>
  );
};

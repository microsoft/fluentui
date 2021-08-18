import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SwitchSlots, SwitchState } from './Switch.types';
import { sliderShorthandProps } from './useSwitch';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch = (state: SwitchState) => {
  const { slots, slotProps } = getSlots<SwitchSlots>(state, sliderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.track {...slotProps.track} />
      <slots.thumbWrapper {...slotProps.thumbWrapper}>
        <slots.thumb {...slotProps.thumb} />
      </slots.thumbWrapper>
      <slots.input {...slotProps.input} />
    </slots.root>
  );
};

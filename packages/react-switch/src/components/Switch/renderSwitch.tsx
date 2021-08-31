import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { switchShorthandProps } from './useSwitch';
import type { SwitchState } from './Switch.types';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch = (state: SwitchState) => {
  const { slots, slotProps } = getSlotsCompat(state, switchShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.switchWrapper {...slotProps.switchWrapper}>
        <slots.track {...slotProps.track} />
        <slots.thumbWrapper {...slotProps.thumbWrapper}>
          <slots.thumb {...slotProps.thumb} />
        </slots.thumbWrapper>
        <slots.input {...slotProps.input} />
      </slots.switchWrapper>
    </slots.root>
  );
};

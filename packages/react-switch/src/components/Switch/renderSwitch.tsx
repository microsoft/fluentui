import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SwitchSlots, SwitchState } from './Switch.types';
import { switchShorthandProps } from './useSwitch';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch = (state: SwitchState) => {
  const { slots, slotProps } = getSlots<SwitchSlots>(state, switchShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.labelPosition === 'before' && state.children}
      <slots.switchWrapper {...slotProps.switchWrapper}>
        <slots.track {...slotProps.track} />
        <slots.thumbWrapper {...slotProps.thumbWrapper}>
          <slots.thumb {...slotProps.thumb} />
        </slots.thumbWrapper>
        <slots.input {...slotProps.input} />
      </slots.switchWrapper>
      {state.labelPosition === 'after' && state.children}
    </slots.root>
  );
};

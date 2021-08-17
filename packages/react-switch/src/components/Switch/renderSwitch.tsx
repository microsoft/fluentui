import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { SwitchState } from './Switch.types';
import { switchShorthandProps } from './useSwitch';

/**
 * Render the final JSX of Switch
 */
export const renderSwitch = (state: SwitchState) => {
  const { slots, slotProps } = getSlots(state, switchShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};

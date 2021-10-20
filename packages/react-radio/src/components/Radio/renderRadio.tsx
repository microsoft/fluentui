import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioState, RadioSlots } from './Radio.types';
import { radioShorthandProps } from './useRadio';

/**
 * Render the final JSX of Radio
 */
export const renderRadio = (state: RadioState) => {
  const { slots, slotProps } = getSlots<RadioSlots>(state, radioShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.root.children}
    </slots.root>
  );
};

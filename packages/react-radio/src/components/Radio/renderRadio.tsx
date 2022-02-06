import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioState, RadioSlots } from './Radio.types';

/**
 * Render the final JSX of Radio
 */
export const renderRadio_unstable = (state: RadioState) => {
  const { slots, slotProps } = getSlots<RadioSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.root.children}
    </slots.root>
  );
};

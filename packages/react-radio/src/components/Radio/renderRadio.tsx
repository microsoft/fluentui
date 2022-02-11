import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioSlots, RadioRender } from './Radio.types';

/**
 * Render the final JSX of Radio
 */
export const renderRadio_unstable: RadioRender = state => {
  const { slots, slotProps } = getSlots<RadioSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.root.children}
    </slots.root>
  );
};

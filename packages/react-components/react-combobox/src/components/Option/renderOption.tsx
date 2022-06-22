import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { OptionState, OptionSlots } from './Option.types';

/**
 * Render the final JSX of Option
 */
export const renderOption_unstable = (state: OptionState) => {
  const { slots, slotProps } = getSlots<OptionSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.checkIcon {...slotProps.checkIcon} />
      {slotProps.root.children}
    </slots.root>
  );
};

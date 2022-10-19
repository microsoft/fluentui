import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { InfoButtonState, InfoButtonSlots } from './InfoButton.types';
import { PopoverProps, PopoverTrigger } from '@fluentui/react-popover';

/**
 * Render the final JSX of InfoButton
 */
export const renderInfoButton_unstable = (state: InfoButtonState) => {
  const { slots, slotProps } = getSlots<InfoButtonSlots>(state);

  return (
    <slots.root {...(slotProps.root as PopoverProps)}>
      <PopoverTrigger>
        <slots.button {...slotProps.button} />
      </PopoverTrigger>
      <slots.content {...slotProps.content} />
    </slots.root>
  );
};

import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { PopoverProps, PopoverTrigger } from '@fluentui/react-popover';
import type { InfoButtonState, InfoButtonSlots } from './InfoButton.types';

/**
 * Render the final JSX of InfoButton
 */
export const renderInfoButton_unstable = (state: InfoButtonState) => {
  const { slots, slotProps } = getSlots<InfoButtonSlots>(state);

  return (
    <slots.popover {...(slotProps.popover as PopoverProps)}>
      <PopoverTrigger>
        <slots.root {...slotProps.root} />
      </PopoverTrigger>
      <slots.content {...slotProps.content} />
    </slots.popover>
  );
};

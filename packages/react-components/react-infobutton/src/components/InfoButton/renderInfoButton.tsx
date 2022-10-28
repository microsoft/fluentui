import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { Popover, PopoverProps, PopoverTrigger } from '@fluentui/react-popover';
import type { InfoButtonState, InfoButtonSlots } from './InfoButton.types';

/**
 * Render the final JSX of InfoButton
 */
export const renderInfoButton_unstable = (state: InfoButtonState) => {
  const { slots, slotProps } = getSlots<InfoButtonSlots>(state);

  return (
    <Popover {...(state as Omit<PopoverProps, 'children'>)}>
      <PopoverTrigger>
        <slots.root {...slotProps.root} />
      </PopoverTrigger>
      <slots.popoverSurface {...slotProps.popoverSurface} />
    </Popover>
  );
};

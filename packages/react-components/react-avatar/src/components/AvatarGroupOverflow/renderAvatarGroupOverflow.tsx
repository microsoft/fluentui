import * as React from 'react';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { getSlots } from '@fluentui/react-utilities';
import { PopoverProps, PopoverTrigger } from '@fluentui/react-popover';
import { TooltipProps } from '@fluentui/react-tooltip';
import type { AvatarGroupOverflowState, AvatarGroupOverflowSlots } from './AvatarGroupOverflow.types';

/**
 * Render the final JSX of AvatarGroupOverflow
 */
export const renderAvatarGroupOverflow_unstable = (state: AvatarGroupOverflowState) => {
  const { slots, slotProps } = getSlots<AvatarGroupOverflowSlots>(state);

  return (
    <slots.root {...(slotProps.root as PopoverProps)}>
      <PopoverTrigger>
        <slots.tooltip {...(slotProps.tooltip as TooltipProps)}>
          <slots.triggerButton {...slotProps.triggerButton} />
        </slots.tooltip>
      </PopoverTrigger>
      <slots.popoverSurface {...slotProps.popoverSurface}>
        <AvatarGroupContext.Provider value={{ isOverflow: true, size: 24 }}>
          <slots.content {...slotProps.content} />
        </AvatarGroupContext.Provider>
      </slots.popoverSurface>
    </slots.root>
  );
};

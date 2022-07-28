import * as React from 'react';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { getSlots } from '@fluentui/react-utilities';
import { PopoverProps, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';
import type { AvatarGroupOverflowState, AvatarGroupOverflowSlots } from './AvatarGroupOverflow.types';

/**
 * Render the final JSX of AvatarGroupOverflow
 */
export const renderAvatarGroupOverflow_unstable = (state: AvatarGroupOverflowState) => {
  const { slots, slotProps } = getSlots<AvatarGroupOverflowSlots>(state);

  return (
    <slots.root {...(slotProps.root as PopoverProps)}>
      <PopoverTrigger>
        <Tooltip content={state.tooltipContent} relationship="label">
          <slots.overflowButton {...slotProps.overflowButton} />
        </Tooltip>
      </PopoverTrigger>
      {slots.overflowSurface && (
        <slots.overflowSurface {...slotProps.overflowSurface}>
          <AvatarGroupContext.Provider value={{ isOverflow: true, size: 24 }}>
            {slots.overflowContent && <slots.overflowContent {...slotProps.overflowContent} />}
          </AvatarGroupContext.Provider>
        </slots.overflowSurface>
      )}
    </slots.root>
  );
};

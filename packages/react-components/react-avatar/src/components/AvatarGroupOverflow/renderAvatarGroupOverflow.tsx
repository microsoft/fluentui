import * as React from 'react';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { getSlots } from '@fluentui/react-utilities';
import { Popover, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';
import type { AvatarGroupOverflowState, AvatarGroupOverflowSlots } from './AvatarGroupOverflow.types';

/**
 * Render the final JSX of AvatarGroupOverflow
 */
export const renderAvatarGroupOverflow_unstable = (state: AvatarGroupOverflowState) => {
  const { slots, slotProps } = getSlots<AvatarGroupOverflowSlots>(state);
  const { handleOnPopoverChange } = state;

  return (
    <Popover trapFocus size="small" onOpenChange={handleOnPopoverChange}>
      <PopoverTrigger>
        <Tooltip content={state.tooltipContent} relationship="label">
          <slots.root {...slotProps.root} />
        </Tooltip>
      </PopoverTrigger>
      {slots.overflowSurface && (
        <slots.overflowSurface {...slotProps.overflowSurface}>
          <AvatarGroupContext.Provider value={{ isOverflow: true, size: 24 }}>
            {slots.overflowContent && <slots.overflowContent {...slotProps.overflowContent} />}
          </AvatarGroupContext.Provider>
        </slots.overflowSurface>
      )}
    </Popover>
  );
};

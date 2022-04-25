import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AvatarGroupState, AvatarGroupSlots } from './AvatarGroup.types';
import { Popover, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';

/**
 * Render the final JSX of AvatarGroup
 */
export const renderAvatarGroup_unstable = (state: AvatarGroupState) => {
  const { slots, slotProps } = getSlots<AvatarGroupSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {state.root.children}
      {slots.popoverSurface && slots.popoverTrigger && slotProps.popoverSurface.children && (
        <Popover trapFocus size="small">
          <PopoverTrigger>
            <Tooltip content={state.tooltipContent} relationship="description" appearance="inverted">
              <slots.popoverTrigger {...slotProps.popoverTrigger} />
            </Tooltip>
          </PopoverTrigger>
          <slots.popoverSurface {...slotProps.popoverSurface} />
        </Popover>
      )}
    </slots.root>
  );
};

import * as React from 'react';
import { Popover, PopoverTrigger } from '@fluentui/react-popover';
import { Tooltip } from '@fluentui/react-tooltip';
import { getSlots } from '@fluentui/react-utilities';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import type { AvatarGroupState, AvatarGroupSlots } from './AvatarGroup.types';

/**
 * Render the final JSX of AvatarGroup
 */
export const renderAvatarGroup_unstable = (state: AvatarGroupState) => {
  const { slots, slotProps } = getSlots<AvatarGroupSlots>(state);
  const { layout, size, nonOverflowAvatarsCount } = state;

  return (
    <AvatarGroupContext.Provider value={{ layout, size, nonOverflowAvatarsCount }}>
      <slots.root {...slotProps.root}>
        {state.root.children}
        {state.hasOverflow && slots.overflowButton && slots.overflowContent && (
          <Popover trapFocus size="small">
            <PopoverTrigger>
              <Tooltip content={state.tooltipContent} relationship="label">
                <slots.overflowButton {...slotProps.overflowButton} />
              </Tooltip>
            </PopoverTrigger>
            <AvatarGroupContext.Provider value={{ isOverflow: true, layout, size: 24 }}>
              <slots.overflowContent {...slotProps.overflowContent} />
            </AvatarGroupContext.Provider>
          </Popover>
        )}
      </slots.root>
    </AvatarGroupContext.Provider>
  );
};

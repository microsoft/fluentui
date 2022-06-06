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
  const { layout, size } = state;

  return (
    <AvatarGroupContext.Provider value={{ layout, size }}>
      <slots.root {...slotProps.root}>
        {state.root.children}
        {state.hasOverflow && slots.overflowButton && slots.overflowSurface && slots.overflowList && (
          <Popover trapFocus size="small">
            <PopoverTrigger>
              <Tooltip content={state.tooltipContent} relationship="label">
                <slots.overflowButton {...slotProps.overflowButton} />
              </Tooltip>
            </PopoverTrigger>
            <slots.overflowSurface {...slotProps.overflowSurface}>
              <AvatarGroupContext.Provider value={{ isOverflow: true, layout, size: 24 }}>
                <slots.overflowList {...slotProps.overflowList} />
              </AvatarGroupContext.Provider>
            </slots.overflowSurface>
          </Popover>
        )}
      </slots.root>
    </AvatarGroupContext.Provider>
  );
};

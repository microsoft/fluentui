import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AvatarGroupItemState, AvatarGroupItemSlots } from './AvatarGroupItem.types';

/**
 * Render the final JSX of AvatarGroupItem
 */
export const renderAvatarGroupItem_unstable = (state: AvatarGroupItemState) => {
  const { slots, slotProps } = getSlots<AvatarGroupItemSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.avatar {...slotProps.avatar} />
      {state.isOverflowItem && <slots.overflowLabel {...slotProps.overflowLabel} />}
    </slots.root>
  );
};

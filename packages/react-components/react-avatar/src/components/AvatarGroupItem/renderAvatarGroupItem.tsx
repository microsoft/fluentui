import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AvatarGroupItemState, AvatarGroupItemSlots } from './AvatarGroupItem.types';

/**
 * Render the final JSX of AvatarGroupItem
 */
export const renderAvatarGroupItem_unstable = (state: AvatarGroupItemState) => {
  const { slots, slotProps } = getSlots<AvatarGroupItemSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

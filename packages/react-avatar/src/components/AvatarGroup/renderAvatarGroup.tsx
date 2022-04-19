import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AvatarGroupState, AvatarGroupSlots } from './AvatarGroup.types';

/**
 * Render the final JSX of AvatarGroup
 */
export const renderAvatarGroup_unstable = (state: AvatarGroupState) => {
  const { slots, slotProps } = getSlots<AvatarGroupSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

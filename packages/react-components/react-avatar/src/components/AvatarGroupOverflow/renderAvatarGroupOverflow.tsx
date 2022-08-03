import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AvatarGroupOverflowState, AvatarGroupOverflowSlots } from './AvatarGroupOverflow.types';

/**
 * Render the final JSX of AvatarGroupOverflow
 */
export const renderAvatarGroupOverflow_unstable = (state: AvatarGroupOverflowState) => {
  const { slots, slotProps } = getSlots<AvatarGroupOverflowSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};

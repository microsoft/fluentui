import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AvatarGroupProvider } from '../../contexts/AvatarGroupContext';
import type { AvatarGroupState, AvatarGroupSlots, AvatarGroupContextValues } from './AvatarGroup.types';

/**
 * Render the final JSX of AvatarGroup
 */
export const renderAvatarGroup_unstable = (state: AvatarGroupState, contextValues: AvatarGroupContextValues) => {
  const { slots, slotProps } = getSlots<AvatarGroupSlots>(state);

  return (
    <AvatarGroupProvider value={contextValues.avatarGroup}>
      <slots.root {...slotProps.root} />
    </AvatarGroupProvider>
  );
};

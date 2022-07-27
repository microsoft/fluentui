import * as React from 'react';
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
      <slots.root {...slotProps.root} />
    </AvatarGroupContext.Provider>
  );
};

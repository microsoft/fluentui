import * as React from 'react';
import { AvatarBadgeState } from './AvatarBadge.types';
import { getSlots } from '@fluentui/react-utilities';
import { avatarBadgeShorthandProps } from './useAvatarBadge';

export const renderAvatarBadge = (state: AvatarBadgeState) => {
  const { slots, slotProps } = getSlots(state, avatarBadgeShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

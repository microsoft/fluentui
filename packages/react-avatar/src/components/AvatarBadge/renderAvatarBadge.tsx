import * as React from 'react';
import { avatarBadgeShorthandProps, AvatarBadgeState } from './AvatarBadge.types';
import { getSlots } from '@fluentui/react-utilities';

export const renderAvatarBadge = (state: AvatarBadgeState) => {
  const { slots, slotProps } = getSlots(state, avatarBadgeShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

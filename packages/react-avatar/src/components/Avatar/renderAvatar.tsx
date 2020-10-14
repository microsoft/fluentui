import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { AvatarState } from './Avatar.types';
import { avatarShorthandProps } from './useAvatar';

export const renderAvatar = (state: AvatarState) => {
  const { slots, slotProps } = getSlots(state, avatarShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.label {...slotProps.label} />
      <slots.image {...slotProps.image} />
      <slots.badge {...slotProps.badge} />
    </slots.root>
  );
};

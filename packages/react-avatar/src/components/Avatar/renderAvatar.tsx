import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AvatarSlots, AvatarState } from './Avatar.types';

const avatarSlots: (keyof AvatarSlots)[] = ['label', 'image', 'badge', 'icon'];

export const renderAvatar = (state: AvatarState) => {
  const { slots, slotProps } = getSlots<AvatarSlots>(state, avatarSlots);

  return (
    <slots.root {...slotProps.root}>
      <slots.label {...slotProps.label} />
      <slots.icon {...slotProps.icon} />
      <slots.image {...slotProps.image} />
      <slots.badge {...slotProps.badge} />
    </slots.root>
  );
};

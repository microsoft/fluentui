import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AvatarSlots, AvatarState } from './Avatar.types';

export const renderAvatar = (state: AvatarState) => {
  const { slots, slotProps } = getSlots<AvatarSlots>(state, ['label', 'image', 'badge', 'icon']);

  return (
    <slots.root {...slotProps.root}>
      {/* The icon is only rendered when there is no label text */}
      {slotProps.label.children ? <slots.label {...slotProps.label} /> : <slots.icon {...slotProps.icon} />}
      <slots.image {...slotProps.image} />
      <slots.badge {...slotProps.badge} />
    </slots.root>
  );
};

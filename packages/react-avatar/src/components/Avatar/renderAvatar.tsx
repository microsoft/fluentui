import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { avatarShorthandPropsCompat } from './useAvatar';
import type { AvatarState } from './Avatar.types';

export const renderAvatar = (state: AvatarState) => {
  const { slots, slotProps } = getSlotsCompat(state, avatarShorthandPropsCompat);
  return (
    <slots.root {...slotProps.root}>
      <slots.label {...slotProps.label} />
      {state.showIcon && <slots.icon {...slotProps.icon} />}
      <slots.image {...slotProps.image} />
      <slots.badge {...slotProps.badge} />
    </slots.root>
  );
};

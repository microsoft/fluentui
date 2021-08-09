import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { AvatarState } from './Avatar.types';
import { avatarShorthandPropsCompat } from './useAvatar';

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

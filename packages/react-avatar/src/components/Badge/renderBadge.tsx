import * as React from 'react';
import { badgeShorthandProps, BadgeState } from './Badge.types';
import { getSlots } from '@fluentui/react-utilities';

export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlots(state, badgeShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

import * as React from 'react';
import { BadgeState } from './Badge.types';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { badgeShorthandProps } from './useBadge';

export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlots(state, badgeShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

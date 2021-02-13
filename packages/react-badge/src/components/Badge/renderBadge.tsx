import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { BadgeState } from './Badge.types';
import { badgeShorthandProps } from './useBadge';

export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlots(state, badgeShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {state.iconPosition === 'before' && <slots.icon {...slotProps.icon} />}
      {state.children}
      {state.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};

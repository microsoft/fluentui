import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { BadgeState } from './Badge.types';
import { badgeShorthandPropsCompat } from './useBadge';

export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlotsCompat(state, badgeShorthandPropsCompat);

  return (
    <slots.root {...slotProps.root}>
      {state.iconPosition === 'before' && <slots.icon {...slotProps.icon} />}
      {state.children}
      {state.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};

import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { BadgeState } from './Badge.types';
import { badgeShorthandProps } from './useBadge';

/**
 * Function that renders the final JSX of the component
 */
export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlots(state, badgeShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};

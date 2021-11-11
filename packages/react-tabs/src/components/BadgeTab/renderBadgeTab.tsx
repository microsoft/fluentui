import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { badgeTabShorthandProps } from './useBadgeTab';
import type { BadgeTabState, BadgeTabSlots } from './BadgeTab.types';

/**
 * Render the final JSX of BadgeTab
 */
export const renderBadgeTab = (state: BadgeTabState) => {
  const { slots, slotProps } = getSlots<BadgeTabSlots>(state, badgeTabShorthandProps);

  return (
    <slots.root role="tab" {...slotProps.root}>
      <slots.content {...slotProps.content}>
        <slots.badge {...slotProps.badge} />
        <slots.icon {...slotProps.icon} />
        <slots.children {...slotProps.children} />
      </slots.content>
    </slots.root>
  );
};

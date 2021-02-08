import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { BadgeState } from './Badge.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

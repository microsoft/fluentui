/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { BadgeState, BadgeSlots } from './Badge.types';

export const renderBadge_unstable = (state: BadgeState) => {
  const { slots, slotProps } = getSlotsNext<BadgeSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.iconPosition === 'before' && slots.icon && <slots.icon {...slotProps.icon} />}
      {state.root.children}
      {state.iconPosition === 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};

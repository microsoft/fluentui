import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { CounterBadgeState } from './CounterBadge.types';
import { counterBadgeShorthandProps } from './useCounterBadge';

export const renderCounterBadge = (state: CounterBadgeState) => {
  const { slots, slotProps } = getSlots(state, counterBadgeShorthandProps);
  let content = '';
  if (state.count !== 0 || (state.count === 0 && state.showZero)) {
    content = state.count > state.overflowCount ? `${state.overflowCount}+` : `${state.count}`;
  }
  return (
    <slots.root {...slotProps.root}>
      {state.iconPosition === 'before' && <slots.icon {...slotProps.icon} />}
      {content}
      {state.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};

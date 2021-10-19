import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { cardFooterShorthandProps } from './useCardFooter';
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';

/**
 * Render the final JSX of CardFooter
 */
export const renderCardFooter = (state: CardFooterState) => {
  const { slots, slotProps } = getSlots<CardFooterSlots>(state, cardFooterShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children}
      <slots.action {...slotProps.action} />
    </slots.root>
  );
};

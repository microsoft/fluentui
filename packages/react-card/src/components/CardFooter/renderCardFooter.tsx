import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CardFooterState } from './CardFooter.types';
import { cardFooterShorthandProps } from './useCardFooter';

/**
 * Render the final JSX of CardFooter
 */
export const renderCardFooter = (state: CardFooterState) => {
  const { slots, slotProps } = getSlotsCompat(state, cardFooterShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <div>{state.children}</div>
      <slots.action {...slotProps.action} />
    </slots.root>
  );
};

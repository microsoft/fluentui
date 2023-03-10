import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardContextValue, CardSlots, CardState } from './Card.types';
import { CardProvider } from './CardContext';

/**
 * Render the final JSX of Card.
 */
export const renderCard_unstable = (state: CardState, cardContextValue: CardContextValue) => {
  const { slots, slotProps } = getSlots<CardSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <CardProvider value={cardContextValue}>
        {slots.checkbox ? <slots.checkbox {...slotProps.checkbox} /> : null}
        {slots.floatingAction ? <slots.floatingAction {...slotProps.floatingAction} /> : null}
        {slotProps.root.children}
      </CardProvider>
    </slots.root>
  );
};

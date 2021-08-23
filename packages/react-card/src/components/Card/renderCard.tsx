import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { cardShorthandProps } from './useCard';
import type { CardState } from './Card.types';

/**
 * Render the final JSX of Card
 */
export const renderCard = (state: CardState) => {
  const { slots, slotProps } = getSlots(state, cardShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropriate place */}
      {state.children}
    </slots.root>
  );
};

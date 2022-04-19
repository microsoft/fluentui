import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardSlots, CardState } from './Card.types';

/**
 * Render the final JSX of Card
 */
export const renderCard_unstable = (state: CardState) => {
  const { slots, slotProps } = getSlots<CardSlots>(state);

  return <slots.root {...slotProps.root} />;
};

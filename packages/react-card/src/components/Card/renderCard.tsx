import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardSlots, CardRender } from './Card.types';

/**
 * Render the final JSX of Card
 */
export const renderCard_unstable: CardRender = state => {
  const { slots, slotProps } = getSlots<CardSlots>(state);

  return <slots.root {...slotProps.root} />;
};

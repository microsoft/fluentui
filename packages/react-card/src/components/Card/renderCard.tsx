import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import type { CardState } from './Card.types';

/**
 * Render the final JSX of Card
 */
export const renderCard = (state: CardState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

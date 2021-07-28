import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CardState } from './Card.types';

/**
 * Define the render function. Given the state of a card, renders it.
 */
export const renderCard = (state: CardState) => {
  const { slots, slotProps } = getSlotsCompat(state);
  const { children } = state;

  return <slots.root {...slotProps.root}>{children}</slots.root>;
};

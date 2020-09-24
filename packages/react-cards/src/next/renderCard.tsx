import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { CardState } from './Card.types';

/**
 * Define the render function. Given the state of a card, renders it.
 */
export const renderCard = (state: CardState) => {
  const { slots, slotProps } = getSlots(state);
  const { children } = state;

  return <slots.root {...slotProps.root}>{children}</slots.root>;
};

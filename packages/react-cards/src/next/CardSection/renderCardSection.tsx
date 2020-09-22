import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';
import { CardSectionState } from './CardSection.types';

export const renderCardSection = (state: CardSectionState) => {
  const { slots, slotProps } = getSlots(state);
  const { children } = state;

  return <slots.root {...slotProps.root}>{children}</slots.root>;
};

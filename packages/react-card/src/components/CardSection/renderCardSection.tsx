import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CardSectionState } from './CardSection.types';

export const renderCardSection = (state: CardSectionState) => {
  const { slots, slotProps } = getSlotsCompat(state);
  const { children } = state;

  return <slots.root {...slotProps.root}>{children}</slots.root>;
};

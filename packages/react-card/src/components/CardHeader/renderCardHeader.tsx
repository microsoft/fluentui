import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';
import { cardHeaderShorthandProps } from './useCardHeader';

/**
 * Render the final JSX of CardHeader
 */
export const renderCardHeader = (state: CardHeaderState) => {
  const { slots, slotProps } = getSlots<CardHeaderSlots>(state, cardHeaderShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.image {...slotProps.image} />
      <slots.content {...slotProps.content}>
        <slots.header {...slotProps.header} />
        <slots.description {...slotProps.description} />
      </slots.content>
      <slots.action {...slotProps.action} />
    </slots.root>
  );
};

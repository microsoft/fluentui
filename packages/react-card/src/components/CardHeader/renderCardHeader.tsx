import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { cardHeaderShorthandPropsCompat } from './useCardHeader';
import type { CardHeaderState } from './CardHeader.types';

/**
 * Render the final JSX of CardHeader
 */
export const renderCardHeader = (state: CardHeaderState) => {
  const { slots, slotProps } = getSlotsCompat(state, cardHeaderShorthandPropsCompat);

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

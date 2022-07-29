import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

/**
 * Render the final JSX of CardHeader.
 */
export const renderCardHeader_unstable = (state: CardHeaderState) => {
  const { slots, slotProps } = getSlots<CardHeaderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.image && <slots.image {...slotProps.image} />}
      <slots.header {...slotProps.header} />
      {slots.description && <slots.description {...slotProps.description} />}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};

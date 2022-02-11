import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardHeaderSlots, CardHeaderRender } from './CardHeader.types';

/**
 * Render the final JSX of CardHeader
 */
export const renderCardHeader_unstable: CardHeaderRender = state => {
  const { slots, slotProps } = getSlots<CardHeaderSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.image {...slotProps.image} />
      {slots.content && (
        <slots.content {...slotProps.content}>
          <slots.header {...slotProps.header} />
          <slots.description {...slotProps.description} />
        </slots.content>
      )}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};

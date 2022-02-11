import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { CardFooterSlots, CardFooterRender } from './CardFooter.types';

/**
 * Render the final JSX of CardFooter
 */
export const renderCardFooter_unstable: CardFooterRender = state => {
  const { slots, slotProps } = getSlots<CardFooterSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};

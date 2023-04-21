/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { CardFooterSlots, CardFooterState } from './CardFooter.types';

/**
 * Render the final JSX of CardFooter.
 */
export const renderCardFooter_unstable = (state: CardFooterState) => {
  const { slots, slotProps } = getSlotsNext<CardFooterSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};

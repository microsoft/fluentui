import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionHeaderState } from './AccordionHeader.types';
import { accordionHeaderShorthandProps } from './useAccordionHeader';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader = (state: AccordionHeaderState) => {
  const { slots, slotProps } = getSlots(state, accordionHeaderShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      {state.expandIconPosition === 'start' && <slots.expandIcon {...slotProps.expandIcon} />}
      {state.children}
      {state.expandIconPosition === 'end' && <slots.expandIcon {...slotProps.expandIcon} />}
    </slots.root>
  );
};
//

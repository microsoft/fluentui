import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';

import { AccordionHeaderState, AccordionHeaderSlots, AccordionHeaderContextValues } from './AccordionHeader.types';
import { accordionHeaderShorthandProps } from './useAccordionHeader';
import { AccordionHeaderContext } from './AccordionHeaderContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader = (state: AccordionHeaderState, contextValues: AccordionHeaderContextValues) => {
  const { slots, slotProps } = getSlots<AccordionHeaderSlots>(state, accordionHeaderShorthandProps);

  return (
    <AccordionHeaderContext.Provider value={contextValues.accordionHeader}>
      <slots.root {...slotProps.root}>
        <slots.button {...slotProps.button}>
          {state.expandIconPosition === 'start' && <slots.expandIcon {...slotProps.expandIcon} />}
          <slots.icon {...slotProps.icon} />
          <slots.children {...slotProps.children} />
          {state.expandIconPosition === 'end' && <slots.expandIcon {...slotProps.expandIcon} />}
        </slots.button>
      </slots.root>
    </AccordionHeaderContext.Provider>
  );
};

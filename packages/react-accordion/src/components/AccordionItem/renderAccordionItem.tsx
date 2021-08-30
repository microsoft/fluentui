import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { accordionItemShorthandProps } from './useAccordionItem';
import { AccordionItemContext } from './AccordionItemContext';
import type { AccordionItemState, AccordionItemSlots, AccordionItemContextValues } from './AccordionItem.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem = (state: AccordionItemState, contextValues: AccordionItemContextValues) => {
  const { slots, slotProps } = getSlots<AccordionItemSlots>(state, accordionItemShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <AccordionItemContext.Provider value={contextValues.accordionItem}>
        {slotProps.root.children}
      </AccordionItemContext.Provider>
    </slots.root>
  );
};

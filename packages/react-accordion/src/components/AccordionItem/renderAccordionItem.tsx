import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionItemState, AccordionItemSlots, AccordionItemContextValues } from './AccordionItem.types';
import { accordionItemShorthandProps } from './useAccordionItem';
import { AccordionItemContext } from './AccordionItemContext';

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

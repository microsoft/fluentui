import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionItemContext } from './AccordionItemContext';
import type {
  AccordionItemState,
  AccordionItemSlots,
  AccordionItemContextValues,
  AccordionItemRender,
} from './AccordionItem.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem_unstable: AccordionItemRender = (
  state: AccordionItemState,
  contextValues: AccordionItemContextValues,
) => {
  const { slots, slotProps } = getSlots<AccordionItemSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <AccordionItemContext.Provider value={contextValues.accordionItem}>
        {slotProps.root.children}
      </AccordionItemContext.Provider>
    </slots.root>
  );
};

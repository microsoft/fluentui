import * as React from 'react';
import { DescendantProvider, getSlots } from '@fluentui/react-utilities';
import { AccordionItemState, AccordionItemSlots } from './AccordionItem.types';
import { accordionItemShorthandProps, accordionItemDescendantContext } from './useAccordionItem';
import { AccordionItemContext } from './useAccordionItemContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem = (state: AccordionItemState) => {
  const { slots, slotProps } = getSlots<AccordionItemSlots>(state, accordionItemShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <AccordionItemContext.Provider value={state.context}>
        <DescendantProvider
          context={accordionItemDescendantContext}
          set={state.setDescendants}
          items={state.descendants}
        >
          {state.children}
        </DescendantProvider>
      </AccordionItemContext.Provider>
    </slots.root>
  );
};

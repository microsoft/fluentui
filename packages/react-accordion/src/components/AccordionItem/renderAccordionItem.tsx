import * as React from 'react';
import { getSlots, DescendantProvider } from '@fluentui/react-utilities';
import { AccordionItemState } from './AccordionItem.types';
import { accordionItemShorthandProps, accordionItemDescendantContext } from './useAccordionItem';
import { accordionItemContext } from './useAccordionItemContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem = (state: AccordionItemState) => {
  const { slots, slotProps } = getSlots(state, accordionItemShorthandProps);
  return (
    <accordionItemContext.Provider value={state.context}>
      <DescendantProvider context={accordionItemDescendantContext} set={state.setDescendants} items={state.descendants}>
        <slots.root {...slotProps.root}>{state.children}</slots.root>
      </DescendantProvider>
    </accordionItemContext.Provider>
  );
};

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
    <slots.root {...slotProps.root}>
      <accordionItemContext.Provider value={state.context}>
        <DescendantProvider
          context={accordionItemDescendantContext}
          set={state.setDescendants}
          items={state.descendants}
        >
          {state.children}
        </DescendantProvider>
      </accordionItemContext.Provider>
    </slots.root>
  );
};

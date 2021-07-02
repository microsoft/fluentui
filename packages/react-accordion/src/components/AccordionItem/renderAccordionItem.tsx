import * as React from 'react';
import { getSlotsCompat, DescendantProvider } from '@fluentui/react-utilities';
import { AccordionItemState } from './AccordionItem.types';
import { accordionItemShorthandPropsCompat, accordionItemDescendantContext } from './useAccordionItem';
import { AccordionItemContext } from './useAccordionItemContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem = (state: AccordionItemState) => {
  const { slots, slotProps } = getSlotsCompat(state, accordionItemShorthandPropsCompat);
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

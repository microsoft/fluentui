import * as React from 'react';
import { DescendantProvider, getSlots } from '@fluentui/react-utilities';
import { AccordionState, AccordionSlots } from './Accordion.types';
import { accordionShorthandProps } from './useAccordion';
import { AccordionContext, AccordionDescendantContext } from './useAccordionContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion = (state: AccordionState) => {
  const { slots, slotProps } = getSlots<AccordionSlots>(state, accordionShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <AccordionContext.Provider value={state.context}>
        <DescendantProvider context={AccordionDescendantContext} items={state.descendants} set={state.setDescendants}>
          {state.children}
        </DescendantProvider>
      </AccordionContext.Provider>
    </slots.root>
  );
};

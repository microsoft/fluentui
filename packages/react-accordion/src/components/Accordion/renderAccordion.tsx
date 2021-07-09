import * as React from 'react';
import { DescendantProvider, getSlots } from '@fluentui/react-utilities';
import { AccordionState, AccordionSlots } from './Accordion.types';
import { AccordionContext, AccordionDescendantContext, useAccordionContextValue } from './AccordionContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion = (state: AccordionState) => {
  const { slots, slotProps } = getSlots<AccordionSlots>(state);

  // TODO: either render function should be a hook or this hook should not be called here
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = useAccordionContextValue(state);

  return (
    <slots.root {...slotProps.root}>
      <AccordionContext.Provider value={value}>
        <DescendantProvider context={AccordionDescendantContext} items={state.descendants} set={state.setDescendants}>
          {state.children}
        </DescendantProvider>
      </AccordionContext.Provider>
    </slots.root>
  );
};

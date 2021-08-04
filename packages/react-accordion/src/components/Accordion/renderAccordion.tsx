import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionState, AccordionSlots } from './Accordion.types';
import { AccordionContext, useAccordionContextValue } from './AccordionContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion = (state: AccordionState) => {
  const { slots, slotProps } = getSlots<AccordionSlots>(state);

  // TODO: either render function should be a hook or this hook should not be called here
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const accordionContextValue = useAccordionContextValue(state);

  return (
    <slots.root {...slotProps.root}>
      <AccordionContext.Provider value={accordionContextValue}>{state.children}</AccordionContext.Provider>
    </slots.root>
  );
};

import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';

import { AccordionContextValues } from './Accordion.types';
import { AccordionState, AccordionSlots } from './Accordion.types';
import { AccordionContext } from './AccordionContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion = (state: AccordionState, contextValues: AccordionContextValues) => {
  const { slots, slotProps } = getSlots<AccordionSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <AccordionContext.Provider value={contextValues.accordion}>{slotProps.root.children}</AccordionContext.Provider>
    </slots.root>
  );
};

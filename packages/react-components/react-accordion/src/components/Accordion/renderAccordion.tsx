/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';

import { AccordionContext } from './AccordionContext';
import type { AccordionState, AccordionSlots, AccordionContextValues } from './Accordion.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion_unstable = (state: AccordionState, contextValues: AccordionContextValues) => {
  const { slots, slotProps } = getSlotsNext<AccordionSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <AccordionContext.Provider value={contextValues.accordion}>{slotProps.root.children}</AccordionContext.Provider>
    </slots.root>
  );
};

/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';

import { AccordionContext } from './AccordionContext';
import type { AccordionState, AccordionSlots, AccordionContextValues } from './Accordion.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion_unstable = (state: AccordionState, contextValues: AccordionContextValues) => {
  assertSlots<AccordionSlots>(state);

  return (
    <state.root>
      <AccordionContext.Provider value={contextValues.accordion}>{state.root.children}</AccordionContext.Provider>
    </state.root>
  );
};

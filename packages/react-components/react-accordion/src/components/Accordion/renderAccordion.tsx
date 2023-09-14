/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';

import type { AccordionState, AccordionSlots, AccordionContextValues } from './Accordion.types';
import { AccordionProvider } from '../../contexts/accordion';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion_unstable = (state: AccordionState, contextValues: AccordionContextValues) => {
  assertSlots<AccordionSlots>(state);

  return (
    <state.root>
      <AccordionProvider value={contextValues.accordion}>{state.root.children}</AccordionProvider>
    </state.root>
  );
};

/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import { AccordionItemContext } from './AccordionItemContext';
import type { AccordionItemState, AccordionItemSlots, AccordionItemContextValues } from './AccordionItem.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem_unstable = (state: AccordionItemState, contextValues: AccordionItemContextValues) => {
  assertSlots<AccordionItemSlots>(state);

  return (
    <state.root>
      <AccordionItemContext.Provider value={contextValues.accordionItem}>
        {state.root.children}
      </AccordionItemContext.Provider>
    </state.root>
  );
};

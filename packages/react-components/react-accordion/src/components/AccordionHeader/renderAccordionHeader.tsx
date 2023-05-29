/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import { AccordionHeaderContext } from './AccordionHeaderContext';
import type { AccordionHeaderState, AccordionHeaderSlots, AccordionHeaderContextValues } from './AccordionHeader.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader_unstable = (
  state: AccordionHeaderState,
  contextValues: AccordionHeaderContextValues,
) => {
  assertSlots<AccordionHeaderSlots>(state);

  return (
    <AccordionHeaderContext.Provider value={contextValues.accordionHeader}>
      <state.root>
        <state.button>
          {state.expandIconPosition === 'start' && state.expandIcon && <state.expandIcon />}
          {state.icon && <state.icon />}
          {state.root.children}
          {state.expandIconPosition === 'end' && state.expandIcon && <state.expandIcon />}
        </state.button>
      </state.root>
    </AccordionHeaderContext.Provider>
  );
};

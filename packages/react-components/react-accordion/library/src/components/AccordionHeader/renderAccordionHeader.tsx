/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { AccordionHeaderState, AccordionHeaderSlots, AccordionHeaderContextValues } from './AccordionHeader.types';
import { AccordionHeaderProvider } from '../../contexts/accordionHeader';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader_unstable = (
  state: AccordionHeaderState,
  contextValues: AccordionHeaderContextValues,
): JSXElement => {
  assertSlots<AccordionHeaderSlots>(state);

  return (
    <AccordionHeaderProvider value={contextValues.accordionHeader}>
      <state.root>
        <state.button>
          {state.expandIconPosition === 'start' && state.expandIcon && <state.expandIcon />}
          {state.icon && <state.icon />}
          {state.root.children}
          {state.expandIconPosition === 'end' && state.expandIcon && <state.expandIcon />}
        </state.button>
      </state.root>
    </AccordionHeaderProvider>
  );
};

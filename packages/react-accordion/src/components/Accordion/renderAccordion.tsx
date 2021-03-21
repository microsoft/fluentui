import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionState } from './Accordion.types';
import { accordionShorthandProps } from './useAccordion';
import { DescendantProvider } from '../../utils/descendants';
import { accordionContext, accordionDescendantContext } from './useAccordionContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion = (state: AccordionState) => {
  const { slots, slotProps } = getSlots(state, accordionShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <accordionContext.Provider value={state.context}>
        <DescendantProvider context={accordionDescendantContext} items={state.descendants} set={state.setDescendants}>
          {state.children}
        </DescendantProvider>
      </accordionContext.Provider>
    </slots.root>
  );
};

import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionHeaderState, AccordionHeaderSlots } from './AccordionHeader.types';
import { accordionHeaderShorthandProps } from './useAccordionHeader';
import { AccordionHeaderContext, useAccordionHeaderContextValue } from './AccordionHeaderContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader = (state: AccordionHeaderState) => {
  const { slots, slotProps } = getSlots<AccordionHeaderSlots>(state, accordionHeaderShorthandProps);

  // TODO: either render function should be a hook or this hook should not be called here
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const value = useAccordionHeaderContextValue(state);

  return (
    <AccordionHeaderContext.Provider value={value}>
      <slots.root {...slotProps.root}>
        <slots.button {...slotProps.button}>
          {state.expandIconPosition === 'start' && <slots.expandIcon {...slotProps.expandIcon} />}
          <slots.icon {...slotProps.icon} />
          <slots.children {...slotProps.children} />
          {state.expandIconPosition === 'end' && <slots.expandIcon {...slotProps.expandIcon} />}
        </slots.button>
      </slots.root>
    </AccordionHeaderContext.Provider>
  );
};

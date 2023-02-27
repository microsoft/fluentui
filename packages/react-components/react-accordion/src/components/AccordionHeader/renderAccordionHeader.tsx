import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionHeaderContext } from './AccordionHeaderContext';
import type { AccordionHeaderState, AccordionHeaderSlots, AccordionHeaderContextValues } from './AccordionHeader.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader_unstable = (
  state: AccordionHeaderState,
  contextValues: AccordionHeaderContextValues,
) => {
  const { slots, slotProps } = getSlots<AccordionHeaderSlots>(state);

  return (
    <AccordionHeaderContext.Provider value={contextValues.accordionHeader}>
      <slots.root {...slotProps.root}>
        <slots.button {...slotProps.button}>
          {state.expandIconPosition === 'start' && <slots.expandIcon {...slotProps.expandIcon} />}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slotProps.root.children}
          {state.expandIconPosition === 'end' && <slots.expandIcon {...slotProps.expandIcon} />}
        </slots.button>
      </slots.root>
    </AccordionHeaderContext.Provider>
  );
};

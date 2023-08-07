/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { AccordionHeaderState, AccordionHeaderSlots, AccordionHeaderContextValues } from './AccordionHeader.types';
import { AccordionHeaderProvider } from '../../contexts/accordionHeader';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionHeader_unstable = (
  state: AccordionHeaderState,
  contextValues: AccordionHeaderContextValues,
) => {
  const { slots, slotProps } = getSlotsNext<AccordionHeaderSlots>(state);

  return (
    <AccordionHeaderProvider value={contextValues.accordionHeader}>
      <slots.root {...slotProps.root}>
        <slots.button {...slotProps.button}>
          {state.expandIconPosition === 'start' && slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slotProps.root.children}
          {state.expandIconPosition === 'end' && slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        </slots.button>
      </slots.root>
    </AccordionHeaderProvider>
  );
};

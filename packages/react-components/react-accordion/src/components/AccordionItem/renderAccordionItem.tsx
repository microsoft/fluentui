/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { AccordionItemState, AccordionItemSlots, AccordionItemContextValues } from './AccordionItem.types';
import { AccordionItemProvider } from '../../contexts/accordionItem';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem_unstable = (state: AccordionItemState, contextValues: AccordionItemContextValues) => {
  const { slots, slotProps } = getSlotsNext<AccordionItemSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <AccordionItemProvider value={contextValues.accordionItem}>{slotProps.root.children}</AccordionItemProvider>
    </slots.root>
  );
};

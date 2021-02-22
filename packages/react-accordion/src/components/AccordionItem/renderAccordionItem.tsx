import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionItemState } from './AccordionItem.types';
import { accordionItemShorthandProps } from './useAccordionItem';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionItem = (state: AccordionItemState) => {
  const { slots, slotProps } = getSlots(state, accordionItemShorthandProps);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

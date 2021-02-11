import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { AccordionState } from './Accordion.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordion = (state: AccordionState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel_unstable = (state: AccordionPanelState) => {
  const { slots, slotProps } = getSlots<AccordionPanelSlots>(state);
  return state.open ? <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root> : null;
};

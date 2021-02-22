import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { AccordionPanelState } from './AccordionPanel.types';
import { accordionPanelShorthandProps } from './useAccordionPanel';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel = (state: AccordionPanelState) => {
  const { slots, slotProps } = getSlots(state, accordionPanelShorthandProps);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

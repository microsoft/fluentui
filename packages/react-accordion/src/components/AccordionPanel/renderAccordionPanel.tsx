import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { AccordionPanelState } from './AccordionPanel.types';
import { accordionPanelShorthandPropsCompat } from './useAccordionPanel';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel = (state: AccordionPanelState) => {
  const { slots, slotProps } = getSlotsCompat(state, accordionPanelShorthandPropsCompat);
  return state.open ? <slots.root {...slotProps.root}>{state.children}</slots.root> : null;
};

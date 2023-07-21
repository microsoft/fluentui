/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { AccordionPanelState, AccordionPanelSlots } from './AccordionPanel.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderAccordionPanel_unstable = (state: AccordionPanelState) => {
  const { slots, slotProps } = getSlotsNext<AccordionPanelSlots>(state);
  return state.open ? <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root> : null;
};

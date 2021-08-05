import * as React from 'react';
import { useAccordionPanel } from './useAccordionPanel';
import { AccordionPanelProps } from './AccordionPanel.types';
import { renderAccordionPanel } from './renderAccordionPanel';
import { useAccordionPanelStyles } from './useAccordionPanelStyles';

/**
 * Define a styled AccordionPanel, using the `useAccordionPanel` and `useAccordionPanelStyles` hooks.
 */
export const AccordionPanel = React.forwardRef<HTMLElement, AccordionPanelProps>((props, ref) => {
  const state = useAccordionPanel(props, ref);

  useAccordionPanelStyles(state);
  return renderAccordionPanel(state);
});

AccordionPanel.displayName = 'AccordionPanel';

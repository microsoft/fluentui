import * as React from 'react';
import { useAccordionPanel } from './useAccordionPanel';
import { renderAccordionPanel } from './renderAccordionPanel';
import { useAccordionPanelStyles } from './useAccordionPanelStyles';
import type { AccordionPanelProps } from './AccordionPanel.types';

/**
 * Define a styled AccordionPanel, using the `useAccordionPanel` and `useAccordionPanelStyles` hooks.
 */
export const AccordionPanel = React.forwardRef<HTMLElement, AccordionPanelProps>((props, ref) => {
  const state = useAccordionPanel(props, ref);

  useAccordionPanelStyles(state);
  return renderAccordionPanel(state);
});

AccordionPanel.displayName = 'AccordionPanel';

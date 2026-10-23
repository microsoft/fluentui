'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderAccordionPanel, useAccordionPanel } from '@fluentui/react-headless-components-preview/accordion';

import type { AccordionPanelProps } from './AccordionPanel.types';
import { useAccordionPanelStyles } from './useAccordionPanelStyles';

/**
 * An AccordionPanel is the content an AccordionHeader reveals. Windmod AccordionPanel: the
 * headless panel decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> = React.forwardRef((props, ref) => {
  const state = useAccordionPanel(props, ref);
  const styled = useAccordionPanelStyles(state);

  return renderAccordionPanel(styled);
});

AccordionPanel.displayName = 'AccordionPanel';

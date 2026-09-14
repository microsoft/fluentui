'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionPanelProps } from './AccordionPanel.types';
import { useAccordionPanel } from './useAccordionPanel';
import { renderAccordionPanel } from './renderAccordionPanel';

/**
 * Represents the content area of an accordion item, revealed when the associated header is toggled open.
 */
export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> = React.forwardRef((props, ref) => {
  const state = useAccordionPanel(props, ref);

  return renderAccordionPanel(state);
});

AccordionPanel.displayName = 'AccordionPanel';

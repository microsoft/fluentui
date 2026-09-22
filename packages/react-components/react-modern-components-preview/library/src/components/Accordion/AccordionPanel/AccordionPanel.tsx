'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionPanelProps } from './AccordionPanel.types';
import { renderAccordionPanel } from './renderAccordionPanel';
import { useAccordionPanel } from './useAccordionPanel';
import { useAccordionPanelStyles } from './useAccordionPanelStyles.styles';

export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> = React.forwardRef((props, ref) => {
  const state = useAccordionPanel(props, ref);

  useAccordionPanelStyles(state);

  return renderAccordionPanel(state);
});

AccordionPanel.displayName = 'AccordionPanel';

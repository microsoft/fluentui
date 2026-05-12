'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionProps } from './Accordion.types';
import { useAccordion, useAccordionContextValues } from './useAccordion';
import { renderAccordion } from './renderAccordion';

/**
 * Represents a set of collapsible panels with headings.
 */
export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef((props, ref) => {
  const state = useAccordion(props, ref);
  const contextValues = useAccordionContextValues(state);

  return renderAccordion(state, contextValues);
});

Accordion.displayName = 'Accordion';

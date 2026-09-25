'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderAccordion,
  useAccordion,
  useAccordionContextValues,
} from '@fluentui/react-headless-components-preview/accordion';

import type { AccordionProps } from './Accordion.types';
import { useAccordionStyles } from './useAccordionStyles';

/**
 * An Accordion is a set of collapsible sections. Windmod Accordion: the headless accordion
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef((props, ref) => {
  const state = useAccordion(props, ref);
  const styled = useAccordionStyles(state);

  const contextValues = useAccordionContextValues(styled);

  return renderAccordion(styled, contextValues);
});

Accordion.displayName = 'Accordion';

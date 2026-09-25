'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionProps } from './Accordion.types';
import { renderAccordion } from './renderAccordion';
import { useAccordion, useAccordionContextValues } from './useAccordion';
import { useAccordionStyles } from './useAccordionStyles.styles';

export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef((props, ref) => {
  const state = useAccordion(props, ref);
  const contextValues = useAccordionContextValues(state);

  useAccordionStyles(state);

  return renderAccordion(state, contextValues);
});

Accordion.displayName = 'Accordion';

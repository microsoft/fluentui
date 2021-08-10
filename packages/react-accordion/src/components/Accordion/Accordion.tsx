import * as React from 'react';

import { AccordionProps } from './Accordion.types';
import { renderAccordion } from './renderAccordion';
import { useAccordion } from './useAccordion';
import { useAccordionContextValues } from './useAccordionContextValues';

/**
 * Define a styled Accordion, using the `useAccordion` and `useAccordionStyles` hooks.
 */
export const Accordion: React.FunctionComponent<AccordionProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  AccordionProps
>((props, ref) => {
  const state = useAccordion(props, ref);
  const contextValues = useAccordionContextValues(state);

  return renderAccordion(state, contextValues);
});

Accordion.displayName = 'Accordion';

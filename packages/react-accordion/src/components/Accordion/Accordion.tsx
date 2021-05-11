import * as React from 'react';
import { useAccordion } from './useAccordion';
import { AccordionProps } from './Accordion.types';
import { renderAccordion } from './renderAccordion';

/**
 * Define a styled Accordion, using the `useAccordion` and `useAccordionStyles` hooks.
 */
export const Accordion: React.FunctionComponent<AccordionProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  AccordionProps
>((props, ref) => {
  const state = useAccordion(props, ref);

  return renderAccordion(state);
});

Accordion.displayName = 'Accordion';

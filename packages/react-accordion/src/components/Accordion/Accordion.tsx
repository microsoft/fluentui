import * as React from 'react';
import { useAccordion } from './useAccordion';
import { AccordionProps } from './Accordion.types';
import { renderAccordion } from './renderAccordion';
import { useAccordionStyles } from './useAccordionStyles';

/**
 * Define a styled Accordion, using the `useAccordion` hook.
 * {@docCategory Accordion}
 */
export const Accordion = React.forwardRef<HTMLElement, AccordionProps>((props, ref) => {
  const state = useAccordion(props, ref);
  useAccordionStyles(state);

  return renderAccordion(state);
});

Accordion.displayName = 'Accordion';

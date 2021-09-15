import { renderAccordion } from './renderAccordion';
import { useAccordion } from './useAccordion';
import { useAccordionContextValues } from './useAccordionContextValues';
import type { AccordionProps } from './Accordion.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled Accordion, using the `useAccordion` and `useAccordionStyles` hooks.
 */
export const Accordion = forwardRef<AccordionProps>((props, ref) => {
  const state = useAccordion(props, ref);
  const contextValues = useAccordionContextValues(state);

  return renderAccordion(state, contextValues);
});

Accordion.displayName = 'Accordion';

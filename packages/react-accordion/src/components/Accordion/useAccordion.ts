import * as React from 'react';
import type { AccordionProps, AccordionState, RenderAccordion, AccordionContextValues } from './Accordion.types';
import { useAccordionContextValues } from './useAccordionContextValues';
import { useAccordionStyles } from './useAccordionStyles';
import { renderAccordion } from './renderAccordion';
import { useAccordionState } from './useAccordionState';

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 */
export const useAccordion = (
  props: AccordionProps,
  ref: React.Ref<HTMLElement>,
): [AccordionState, RenderAccordion, AccordionContextValues] => {
  const state = useAccordionState(props, ref);
  const contextValues = useAccordionContextValues(state);
  useAccordionStyles(state);

  return [state, renderAccordion, contextValues];
};

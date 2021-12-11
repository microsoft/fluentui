import * as React from 'react';
import type { AccordionProps, AccordionState, RenderAccordion } from './Accordion.types';
import { useAccordionContextValues } from './useAccordionContextValues';
import { useAccordionStyles } from './useAccordionStyles';
import { renderAccordion } from './renderAccordion';
import { useAccordionState } from './useAccordionState';

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 */
export const useAccordion = (props: AccordionProps, ref: React.Ref<HTMLElement>): [AccordionState, RenderAccordion] => {
  const state = useAccordionState(props, ref);
  const contextValues = useAccordionContextValues(state);
  useAccordionStyles(state);

  // TODO: Judgement tells me we shouldn't be doing logical work like
  //       assembling this renderer here in the useAccordion hook.
  //       The renderAccordion hook itself may be responsible for getting the context since it alone uses it?
  //       At the least, all logic should be contained within the hooks themselves, not outside.
  const render = React.useCallback(
    (accordionState: AccordionState) => {
      return renderAccordion(accordionState, contextValues);
    },
    [contextValues],
  );

  return [state, render];
};

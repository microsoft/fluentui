import * as React from 'react';
import { createDescendantContext, DescendantContextValue, useDescendant } from '@fluentui/react-utilities';
import { AccordionContextValue, AccordionDescendant, AccordionState } from './Accordion.types';
import { createContext, Context } from '@fluentui/react-context-selector';

export const AccordionDescendantContext: React.Context<
  DescendantContextValue<AccordionDescendant<HTMLElement>>
> = createDescendantContext<AccordionDescendant>('AccordionDescendantContext');

export const AccordionContext: Context<AccordionContextValue> = createContext<AccordionContextValue>({
  openItems: [],
  navigable: false,
  requestToggle() {
    /* noop */
  },
});

/**
 * Registers an descendant in the accordion descendants context
 */
export function useAccordionDescendant(accordionDescendant: Omit<AccordionDescendant, 'index'>) {
  return useDescendant<AccordionDescendant>(accordionDescendant, AccordionDescendantContext);
}

export function createAccordionContextValue({
  navigable,
  openItems,
  requestToggle,
}: AccordionState): AccordionContextValue {
  return {
    navigable,
    openItems,
    requestToggle,
  };
}

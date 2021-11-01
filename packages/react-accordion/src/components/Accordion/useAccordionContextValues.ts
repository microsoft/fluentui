import type { AccordionContextValue, AccordionContextValues, AccordionState } from './Accordion.types';

export function useAccordionContextValues(state: AccordionState): AccordionContextValues {
  const { navigable, openItems, requestToggle, collapsible } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const accordion: AccordionContextValue = {
    navigable,
    openItems,
    requestToggle,
    collapsible,
  };

  return { accordion };
}

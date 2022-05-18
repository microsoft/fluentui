import type { AccordionContextValue, AccordionContextValues, AccordionState } from './Accordion.types';

export function useAccordionContextValues_unstable(state: AccordionState): AccordionContextValues {
  const { navigation, openItems, requestToggle, collapsible } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const accordion: AccordionContextValue = {
    navigation,
    openItems,
    requestToggle,
    collapsible,
  };

  return { accordion };
}

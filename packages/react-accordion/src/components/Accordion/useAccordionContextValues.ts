import { AccordionContextValues, AccordionState } from './Accordion.types';

export function useAccordionContextValues(state: AccordionState): AccordionContextValues {
  const { navigable, openItems, requestToggle } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const accordion = {
    navigable,
    openItems,
    requestToggle,
  };

  return { accordion };
}

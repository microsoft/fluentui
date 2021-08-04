import { AccordionContextValue, AccordionState } from './Accordion.types';
import { createContext, Context } from '@fluentui/react-context-selector';

export const AccordionContext: Context<AccordionContextValue> = createContext<AccordionContextValue>({
  openItems: [],
  navigable: false,
  requestToggle() {
    /* noop */
  },
});

export function useAccordionContextValue({ navigable, openItems, requestToggle }: AccordionState) {
  return {
    navigable,
    openItems,
    requestToggle,
  } as const;
}

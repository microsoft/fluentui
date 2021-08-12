import { createContext, Context } from '@fluentui/react-context-selector';
import { AccordionContextValue } from './Accordion.types';

export const AccordionContext: Context<AccordionContextValue> = createContext<AccordionContextValue>({
  openItems: [],
  navigable: false,
  requestToggle() {
    /* noop */
  },
});

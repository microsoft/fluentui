import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { AccordionContextValue } from './Accordion.types';

export const AccordionContext: Context<AccordionContextValue> = createContext<AccordionContextValue>({
  openItems: [],
  collapsible: false,
  requestToggle() {
    /* noop */
  },
});

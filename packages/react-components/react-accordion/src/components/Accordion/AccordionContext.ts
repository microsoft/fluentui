import { createContext, ContextSelector, useContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { AccordionContextValue } from './Accordion.types';

export const AccordionContext: Context<AccordionContextValue> = createContext<AccordionContextValue | undefined>(
  undefined,
) as Context<AccordionContextValue>;

const accordionContextDefaultValue: AccordionContextValue = {
  openItems: [],
  collapsible: false,
  requestToggle() {
    /* noop */
  },
};

export const AccordionProvider = AccordionContext.Provider;
export const useAccordionContext_unstable = <T>(selector: ContextSelector<AccordionContextValue, T>): T =>
  useContextSelector(AccordionContext, (ctx = accordionContextDefaultValue) => selector(ctx));

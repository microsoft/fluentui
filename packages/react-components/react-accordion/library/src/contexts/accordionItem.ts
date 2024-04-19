import * as React from 'react';
import { AccordionItemValue } from '../AccordionItem';
import { AccordionToggleEvent } from '../Accordion';

export type AccordionItemContextValue<Value = AccordionItemValue> = {
  open: boolean;
  disabled: boolean;
  value: Value;
  /**
   * @deprecated - use `requestToggle` from AccordionContent instead
   */
  onHeaderClick(event: AccordionToggleEvent): void;
};

const AccordionItemContext = React.createContext<AccordionItemContextValue<unknown> | undefined>(
  undefined,
) as React.Context<AccordionItemContextValue<unknown>>;

const accordionItemContextDefaultValue: AccordionItemContextValue<unknown> = {
  open: false,
  disabled: false,
  value: undefined,
  onHeaderClick() {
    /* noop */
  },
};

export const { Provider: AccordionItemProvider } = AccordionItemContext;

export const useAccordionItemContext_unstable = () => {
  return React.useContext(AccordionItemContext) ?? accordionItemContextDefaultValue;
};

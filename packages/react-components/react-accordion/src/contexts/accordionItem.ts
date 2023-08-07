import * as React from 'react';
import { AccordionItemValue } from '../AccordionItem';

export type AccordionItemContextValue<Value = AccordionItemValue> = {
  open: boolean;
  disabled: boolean;
  value: Value;
};

const AccordionItemContext = React.createContext<AccordionItemContextValue<unknown> | undefined>(
  undefined,
) as React.Context<AccordionItemContextValue<unknown>>;

const accordionItemContextDefaultValue: AccordionItemContextValue<unknown> = {
  open: false,
  disabled: false,
  value: undefined,
};

export const { Provider: AccordionItemProvider } = AccordionItemContext;

export const useAccordionItemContext_unstable = () =>
  React.useContext(AccordionItemContext) ?? accordionItemContextDefaultValue;

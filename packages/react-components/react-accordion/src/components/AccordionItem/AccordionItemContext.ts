import * as React from 'react';
import type { AccordionItemContextValue } from './AccordionItem.types';

export const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);

const accordionItemContextDefaultValue = {
  onHeaderClick() {
    /** */
  },
  open: false,
  disabled: false,
};

export const AccordionItemProvider = AccordionItemContext.Provider;

export const useAccordionItemContext_unstable = () =>
  React.useContext(AccordionItemContext) ?? accordionItemContextDefaultValue;

import * as React from 'react';
import type { AccordionItemContextValue } from './AccordionItem.types';

// No default value.
export const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  onHeaderClick() {
    /** */
  },
  open: false,
  disabled: false,
  value: undefined,
});

export const useAccordionItemContext = () => React.useContext(AccordionItemContext);

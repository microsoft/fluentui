import * as React from 'react';
import type { AccordionItemContextValue } from './AccordionItem.types';

// No default value.
export const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  onHeaderClick() {
    /** */
  },
  open: false,
  disabled: false,
});

export const useAccordionItemContext_unstable = () => React.useContext(AccordionItemContext);

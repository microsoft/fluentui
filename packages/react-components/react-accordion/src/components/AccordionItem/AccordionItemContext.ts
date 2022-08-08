import * as React from 'react';
import type { AccordionItemContextValue } from './AccordionItem.types';

// No default value.
// eslint-disable-next-line @fluentui/no-context-default-value
export const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  onHeaderClick() {
    /** */
  },
  open: false,
  disabled: false,
});

export const AccordionItemProvider = AccordionItemContext.Provider;

export const useAccordionItemContext_unstable = () => React.useContext(AccordionItemContext);

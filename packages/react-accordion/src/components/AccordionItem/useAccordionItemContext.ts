import * as React from 'react';
import { AccordionItemContext } from './AccordionItem.types';

// No default value.
export const accordionItemContext = React.createContext<AccordionItemContext>(undefined!);

export function useAccordionItemContext() {
  const context = React.useContext(accordionItemContext);
  if (context === undefined) {
    throw new Error(`${useAccordionItemContext.name} should be used inside an AccordionItem element`);
  }
  return context;
}

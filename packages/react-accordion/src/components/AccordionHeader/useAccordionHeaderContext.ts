import * as React from 'react';
import { AccordionHeaderContextValue } from './AccordionHeader.types';

export const AccordionHeaderContext = React.createContext<AccordionHeaderContextValue>({
  open: false,
  size: 'medium',
  expandIconPosition: 'start',
});

export const useAccordionHeaderContext = () => React.useContext(AccordionHeaderContext);

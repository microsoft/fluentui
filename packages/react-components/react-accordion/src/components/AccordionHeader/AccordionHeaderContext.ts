import * as React from 'react';
import type { AccordionHeaderContextValue } from './AccordionHeader.types';

// eslint-disable-next-line @fluentui/no-context-default-value
export const AccordionHeaderContext = React.createContext<AccordionHeaderContextValue>({
  open: false,
  disabled: false,
  size: 'medium',
  expandIconPosition: 'start',
});

export const useAccordionHeaderContext = () => React.useContext(AccordionHeaderContext);

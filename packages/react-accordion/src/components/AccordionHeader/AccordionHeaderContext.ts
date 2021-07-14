import * as React from 'react';
import { AccordionHeaderContextValue, AccordionHeaderState } from './AccordionHeader.types';

export const AccordionHeaderContext = React.createContext<AccordionHeaderContextValue>({
  open: false,
  disabled: false,
  size: 'medium',
  expandIconPosition: 'start',
});

export const useAccordionHeaderContext = () => React.useContext(AccordionHeaderContext);

export const useAccordionHeaderContextValue = ({ disabled, expandIconPosition, open, size }: AccordionHeaderState) =>
  React.useMemo<AccordionHeaderContextValue>(
    () => ({
      disabled,
      expandIconPosition,
      open,
      size,
    }),
    [disabled, expandIconPosition, open, size],
  );

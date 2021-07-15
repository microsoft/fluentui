import * as React from 'react';
import { AccordionItemContextValue, AccordionItemState } from './AccordionItem.types';

// No default value.
export const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  onHeaderClick() {
    /** */
  },
  open: false,
  disabled: false,
});

export const useAccordionItemContext = () => React.useContext(AccordionItemContext);

export const useAccordionItemContextValue = ({ disabled, onHeaderClick, open }: AccordionItemState) =>
  React.useMemo<AccordionItemContextValue>(() => ({ disabled, onHeaderClick, open }), [disabled, onHeaderClick, open]);

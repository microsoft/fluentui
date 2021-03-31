import * as React from 'react';
import { AccordionHeaderContext, AccordionHeaderState } from './AccordionHeader.types';
import { useAccordionItemContext } from '../AccordionItem/index';

export const accordionHeaderContext = React.createContext<AccordionHeaderContext>({
  open: false,
  size: 'medium',
  expandIconPosition: 'start',
});

export const useAccordionHeaderContext = () => React.useContext(accordionHeaderContext);

export function useCreateAccordionHeaderContext(state: AccordionHeaderState) {
  const { open } = useAccordionItemContext();
  const ctx: AccordionHeaderContext = {
    open,
    expandIconPosition: state.expandIconPosition,
    size: state.size,
  };
  return ctx;
}

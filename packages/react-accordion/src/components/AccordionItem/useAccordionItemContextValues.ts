import * as React from 'react';
import { AccordionItemContextValue, AccordionItemContextValues, AccordionItemState } from './AccordionItem.types';

export function useAccordionItemContextValues(state: AccordionItemState): AccordionItemContextValues {
  const { disabled, onHeaderClick, open } = state;
  const accordionItem = React.useMemo<AccordionItemContextValue>(() => ({ disabled, onHeaderClick, open }), [
    disabled,
    onHeaderClick,
    open,
  ]);

  return { accordionItem };
}

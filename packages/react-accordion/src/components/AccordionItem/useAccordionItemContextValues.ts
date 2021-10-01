import * as React from 'react';
import type { AccordionItemContextValue, AccordionItemContextValues, AccordionItemState } from './AccordionItem.types';

export function useAccordionItemContextValues(state: AccordionItemState): AccordionItemContextValues {
  const { disabled, onHeaderClick, open, value } = state;
  const accordionItem = React.useMemo<AccordionItemContextValue>(() => ({ disabled, onHeaderClick, open, value }), [
    disabled,
    onHeaderClick,
    open,
    value,
  ]);

  return { accordionItem };
}

import * as React from 'react';
import type { AccordionItemContextValue, AccordionItemContextValues, AccordionItemState } from './AccordionItem.types';

export function useAccordionItemContextValues_unstable(state: AccordionItemState): AccordionItemContextValues {
  const { disabled, onHeaderClick, open } = state;
  const accordionItem = React.useMemo<AccordionItemContextValue>(() => ({ disabled, onHeaderClick, open }), [
    disabled,
    onHeaderClick,
    open,
  ]);

  return { accordionItem };
}

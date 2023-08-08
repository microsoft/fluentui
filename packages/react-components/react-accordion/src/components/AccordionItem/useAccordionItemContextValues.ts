import * as React from 'react';
import type { AccordionItemContextValues, AccordionItemState } from './AccordionItem.types';
import { AccordionItemContextValue } from '../../contexts/accordionItem';

export function useAccordionItemContextValues_unstable(state: AccordionItemState): AccordionItemContextValues {
  // eslint-disable-next-line deprecation/deprecation
  const { disabled, open, value, onHeaderClick } = state;
  const accordionItem = React.useMemo<AccordionItemContextValue>(
    () => ({ disabled, open, value, onHeaderClick }),
    [disabled, open, value, onHeaderClick],
  );

  return { accordionItem };
}

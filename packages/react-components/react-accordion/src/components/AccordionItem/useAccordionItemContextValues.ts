import * as React from 'react';
import type { AccordionItemContextValues, AccordionItemState } from './AccordionItem.types';
import { AccordionItemContextValue } from '../../contexts/accordionItem';

export function useAccordionItemContextValues_unstable(state: AccordionItemState): AccordionItemContextValues {
  const { disabled, open, value } = state;
  const accordionItem = React.useMemo<AccordionItemContextValue>(
    () => ({ disabled, open, value }),
    [disabled, open, value],
  );

  return { accordionItem };
}

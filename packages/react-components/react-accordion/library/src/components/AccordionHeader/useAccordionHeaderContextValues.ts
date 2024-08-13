import * as React from 'react';
import type { AccordionHeaderState, AccordionHeaderContextValues } from './AccordionHeader.types';
import type { AccordionHeaderContextValue } from '../../contexts/accordionHeader';

export function useAccordionHeaderContextValues_unstable(state: AccordionHeaderState): AccordionHeaderContextValues {
  const { disabled, expandIconPosition, open, size } = state;

  const accordionHeader = React.useMemo<AccordionHeaderContextValue>(
    () => ({
      disabled,
      expandIconPosition,
      open,
      size,
    }),
    [disabled, expandIconPosition, open, size],
  );

  return { accordionHeader };
}

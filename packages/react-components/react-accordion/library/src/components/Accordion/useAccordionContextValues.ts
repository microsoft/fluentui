'use client';

import * as React from 'react';
import type { AccordionContextValue } from '../../contexts/accordion';
import type { AccordionContextValues, AccordionState } from './Accordion.types';

export function useAccordionContextValues_unstable(state: AccordionState): AccordionContextValues {
  const { navigation, openItems, requestToggle, multiple, collapsible } = state;

  const accordion = React.useMemo<AccordionContextValue>(
    () => ({
      navigation,
      openItems,
      requestToggle,
      collapsible,
      multiple,
    }),
    [navigation, openItems, requestToggle, collapsible, multiple],
  );

  return { accordion };
}

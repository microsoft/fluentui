import * as React from 'react';
import { useAccordionHeader } from './useAccordionHeader';
import { renderAccordionHeader } from './renderAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles';
import { useAccordionHeaderContextValues } from './useAccordionHeaderContextValues';
import type { AccordionHeaderProps } from './AccordionHeader.types';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader` and `useAccordionHeaderStyles` hooks.
 */
export const AccordionHeader: React.FunctionComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const state = useAccordionHeader(props, ref);
  const contextValues = useAccordionHeaderContextValues(state);

  useAccordionHeaderStyles(state);

  return renderAccordionHeader(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';

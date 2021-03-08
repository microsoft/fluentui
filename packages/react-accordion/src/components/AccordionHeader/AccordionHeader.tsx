import * as React from 'react';
import { useAccordionHeader } from './useAccordionHeader';
import { AccordionHeaderProps } from './AccordionHeader.types';
import { renderAccordionHeader } from './renderAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader` and `useAccordionHeaderStyles` hooks.
 * {@docCategoryAccordionHeader} */
export const AccordionHeader = React.forwardRef<HTMLElement, AccordionHeaderProps>((props, ref) => {
  const state = useAccordionHeader(props, ref);

  useAccordionHeaderStyles(state);
  return renderAccordionHeader(state);
});

AccordionHeader.displayName = 'AccordionHeader';

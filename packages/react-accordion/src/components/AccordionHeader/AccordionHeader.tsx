import * as React from 'react';
import { useAccordionHeader } from './useAccordionHeader';
import { AccordionHeaderProps } from './AccordionHeader.types';
import { renderAccordionHeader } from './renderAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles';

const ChevronIcon = (props: React.HTMLAttributes<HTMLElement>) => <div {...props}>{'>'}</div>;

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader` and `useAccordionHeaderStyles` hooks.
 * {@docCategory AccordionHeader\}
 */
export const AccordionHeader = React.forwardRef<HTMLElement, AccordionHeaderProps>((props, ref) => {
  const state = useAccordionHeader(props, ref, {
    expandIcon: { as: ChevronIcon },
    expandIconPosition: 'start',
  });

  useAccordionHeaderStyles(state);
  return renderAccordionHeader(state);
});

AccordionHeader.displayName = 'AccordionHeader';

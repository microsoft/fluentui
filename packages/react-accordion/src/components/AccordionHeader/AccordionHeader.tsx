import * as React from 'react';
import { useAccordionHeader } from './useAccordionHeader';
import { AccordionHeaderProps } from './AccordionHeader.types';
import { renderAccordionHeader } from './renderAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles';
import { useAccordionHeaderContextValues } from './useAccordionHeaderContextValues';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader` and `useAccordionHeaderStyles` hooks.
 */
export const AccordionHeader: React.FunctionComponent<
  AccordionHeaderProps & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, AccordionHeaderProps>((props, ref) => {
  const state = useAccordionHeader(props, ref);
  const contextValues = useAccordionHeaderContextValues(state);

  useAccordionHeaderStyles(state);

  return renderAccordionHeader(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';

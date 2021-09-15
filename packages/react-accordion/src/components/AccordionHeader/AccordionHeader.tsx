import { useAccordionHeader } from './useAccordionHeader';
import { renderAccordionHeader } from './renderAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles';
import { useAccordionHeaderContextValues } from './useAccordionHeaderContextValues';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader` and `useAccordionHeaderStyles` hooks.
 */
export const AccordionHeader = forwardRef<AccordionHeaderProps>((props, ref) => {
  const state = useAccordionHeader(props, ref);
  const contextValues = useAccordionHeaderContextValues(state);

  useAccordionHeaderStyles(state);

  return renderAccordionHeader(state, contextValues);
});

AccordionHeader.displayName = 'AccordionHeader';

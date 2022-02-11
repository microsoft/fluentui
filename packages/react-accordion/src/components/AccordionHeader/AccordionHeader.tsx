import * as React from 'react';
import { useAccordionHeader_unstable } from './useAccordionHeader';
import type { AccordionHeaderProps } from './AccordionHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionHeader, using the `useAccordionHeader_unstable` and `useAccordionHeaderStyles_unstable`
 * hooks.
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> = React.forwardRef((props, ref) => {
  const [state, render, context] = useAccordionHeader_unstable(props, ref);

  return render(state, context);
});

AccordionHeader.displayName = 'AccordionHeader';

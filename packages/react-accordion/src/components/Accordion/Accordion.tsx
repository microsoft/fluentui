import * as React from 'react';
import { useAccordion } from './useAccordion';
import type { AccordionProps } from './Accordion.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Accordion, using the `useAccordion` and `useAccordionStyles` hooks.
 */
export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const [state, render] = useAccordion(props, ref);

    return render(state);
  },
);

Accordion.displayName = 'Accordion';

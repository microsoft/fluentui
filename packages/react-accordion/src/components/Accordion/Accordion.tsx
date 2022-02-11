import * as React from 'react';
import { useAccordion_unstable } from './useAccordion';
import type { AccordionProps } from './Accordion.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Accordion, using the `useAccordion_unstable` and `useAccordionStyles_unstable` hooks.
 */
export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const [state, render, context] = useAccordion_unstable(props, ref);
    return render(state, context);
  },
);

Accordion.displayName = 'Accordion';

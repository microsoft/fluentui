import * as React from 'react';
import { renderAccordion_unstable } from './renderAccordion';
import { useAccordion_unstable } from './useAccordion';
import { useAccordionContextValues_unstable } from './useAccordionContextValues';
import type { AccordionProps } from './Accordion.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAccordionStyles_unstable } from './useAccordionStyles';

/**
 * Define a styled Accordion, using the `useAccordion_unstable` and `useAccordionStyles_unstable` hooks.
 */
export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const state = useAccordion_unstable(props, ref);
    const contextValues = useAccordionContextValues_unstable(state);

    useAccordionStyles_unstable(state);

    return renderAccordion_unstable(state, contextValues);
  },
);

Accordion.displayName = 'Accordion';

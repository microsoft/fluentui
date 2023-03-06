import * as React from 'react';
import { renderAccordion_unstable } from './renderAccordion';
import { useAccordion_unstable } from './useAccordion';
import { useAccordionContextValues_unstable } from './useAccordionContextValues';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';
import { useAccordionStyles_unstable } from './useAccordionStyles';
import type { AccordionProps } from './Accordion.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Accordion, using the `useAccordion_unstable` and `useAccordionStyles_unstable` hooks.
 */
export const Accordion: ForwardRefComponent<AccordionProps> = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const state = useAccordion_unstable(props, ref);
    const contextValues = useAccordionContextValues_unstable(state);

    useAccordionStyles_unstable(state);

    const { useAccordionStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
    useCustomStyles(state);

    return renderAccordion_unstable(state, contextValues);
  },
);

Accordion.displayName = 'Accordion';

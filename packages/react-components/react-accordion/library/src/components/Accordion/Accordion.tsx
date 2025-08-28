import * as React from 'react';
import { renderAccordion_unstable } from './renderAccordion';
import { useAccordion_unstable } from './useAccordion';
import { useAccordionContextValues_unstable } from './useAccordionContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useAccordionStyles_unstable } from './useAccordionStyles.styles';
import type { AccordionProps } from './Accordion.types';
import type { ForwardRefComponent, JSXElement } from '@fluentui/react-utilities';

/**
 * Define a styled Accordion, using the `useAccordion_unstable` and `useAccordionStyles_unstable` hooks.
 */
export const Accordion: ForwardRefComponent<AccordionProps> & (<TItem>(props: AccordionProps<TItem>) => JSXElement) =
  React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
    const state = useAccordion_unstable(props, ref);
    const contextValues = useAccordionContextValues_unstable(state);

    useAccordionStyles_unstable(state);

    useCustomStyleHook_unstable('useAccordionStyles_unstable')(state);

    return renderAccordion_unstable(state, contextValues);
  }) as ForwardRefComponent<AccordionProps> & (<TItem>(props: AccordionProps<TItem>) => JSXElement);

Accordion.displayName = 'Accordion';

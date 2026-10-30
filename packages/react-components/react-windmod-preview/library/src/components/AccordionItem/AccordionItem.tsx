'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderAccordionItem,
  useAccordionItem,
  useAccordionItemContextValues,
} from '@fluentui/react-headless-components-preview/accordion';

import type { AccordionItemProps } from './AccordionItem.types';
import { useAccordionItemStyles } from './useAccordionItemStyles';

/**
 * An AccordionItem pairs one header with one panel. Windmod AccordionItem: the headless item
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const state = useAccordionItem(props, ref);
  const styled = useAccordionItemStyles(state);

  const contextValues = useAccordionItemContextValues(styled);

  return renderAccordionItem(styled, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

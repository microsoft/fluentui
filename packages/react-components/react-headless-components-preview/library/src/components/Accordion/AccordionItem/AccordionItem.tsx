'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AccordionItemProps } from './AccordionItem.types';
import { useAccordionItem, useAccordionItemContextValues } from './useAccordionItem';
import { renderAccordionItem } from './renderAccordionItem';

/**
 * Represents a single collapsible section within an Accordion, containing a header and a panel.
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const state = useAccordionItem(props, ref);
  const contextValues = useAccordionItemContextValues(state);

  return renderAccordionItem(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

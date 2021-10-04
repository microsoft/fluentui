import * as React from 'react';
import { useAccordionItem } from './useAccordionItem';
import { useAccordionItemContextValues } from './useAccordionItemContextValues';
import { renderAccordionItem } from './renderAccordionItem';
import type { AccordionItemProps } from './AccordionItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionItem, using the `useAccordionItem` and `useAccordionItemStyles` hooks.
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const state = useAccordionItem(props, ref);
  const contextValues = useAccordionItemContextValues(state);

  return renderAccordionItem(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

import * as React from 'react';
import { useAccordionItem } from './useAccordionItem';
import { useAccordionItemContextValues } from './useAccordionItemContextValues';
import { AccordionItemProps } from './AccordionItem.types';
import { renderAccordionItem } from './renderAccordionItem';

/**
 * Define a styled AccordionItem, using the `useAccordionItem` and `useAccordionItemStyles` hooks.
 */
export const AccordionItem = React.forwardRef<HTMLElement, AccordionItemProps>((props, ref) => {
  const state = useAccordionItem(props, ref);
  const contextValues = useAccordionItemContextValues(state);

  return renderAccordionItem(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

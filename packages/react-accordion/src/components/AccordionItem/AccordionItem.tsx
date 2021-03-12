import * as React from 'react';
import { useAccordionItem } from './useAccordionItem';
import { AccordionItemProps } from './AccordionItem.types';
import { renderAccordionItem } from './renderAccordionItem';

/**
 * Define a styled AccordionItem, using the `useAccordionItem` and `useAccordionItemStyles` hooks.
 * {@docCategoryAccordionItem} */
export const AccordionItem = React.forwardRef<HTMLElement, AccordionItemProps>((props, ref) => {
  const state = useAccordionItem(props, ref);

  return renderAccordionItem(state);
});

AccordionItem.displayName = 'AccordionItem';

import * as React from 'react';
import { useAccordionItem } from './useAccordionItem';
import { AccordionItemProps } from './AccordionItem.types';
import { renderAccordionItem } from './renderAccordionItem';
import { useAccordionItemStyles } from './useAccordionItemStyles';

/**
 * Define a styled AccordionItem, using the `useAccordionItem` and `useAccordionItemStyles` hooks.
 * {@docCategory AccordionItem\}
 */
export const AccordionItem = React.forwardRef<HTMLElement, AccordionItemProps>((props, ref) => {
  const state = useAccordionItem(props, ref);

  useAccordionItemStyles(state);
  return renderAccordionItem(state);
});

AccordionItem.displayName = 'AccordionItem';

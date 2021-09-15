import { useAccordionItem } from './useAccordionItem';
import { useAccordionItemContextValues } from './useAccordionItemContextValues';
import { renderAccordionItem } from './renderAccordionItem';
import type { AccordionItemProps } from './AccordionItem.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionItem, using the `useAccordionItem` and `useAccordionItemStyles` hooks.
 */
export const AccordionItem = forwardRef<AccordionItemProps>((props, ref) => {
  const state = useAccordionItem(props, ref);
  const contextValues = useAccordionItemContextValues(state);

  return renderAccordionItem(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

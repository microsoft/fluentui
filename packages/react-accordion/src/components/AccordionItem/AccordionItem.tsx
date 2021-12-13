import * as React from 'react';
import { useAccordionItem } from './useAccordionItem';
import type { AccordionItemProps } from './AccordionItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionItem, using the `useAccordionItem` and `useAccordionItemStyles` hooks.
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const [state, render, contextValues] = useAccordionItem(props, ref);

  return render(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

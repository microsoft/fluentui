import * as React from 'react';
import { useAccordionItem_unstable } from './useAccordionItem';
import type { AccordionItemProps } from './AccordionItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled AccordionItem, using the `useAccordionItem_unstable` and `useAccordionItemStyles_unstable` hooks.
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const [state, render, context] = useAccordionItem_unstable(props, ref);
  return render(state, context);
});

AccordionItem.displayName = 'AccordionItem';

import * as React from 'react';
import { useAccordionItem_unstable } from './useAccordionItem';
import { useAccordionItemContextValues_unstable } from './useAccordionItemContextValues';
import { renderAccordionItem_unstable } from './renderAccordionItem';
import type { AccordionItemProps } from './AccordionItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAccordionItemStyles_unstable } from './useAccordionItemStyles';

/**
 * Define a styled AccordionItem, using the `useAccordionItem_unstable` and `useAccordionItemStyles_unstable` hooks.
 */
export const AccordionItem: ForwardRefComponent<AccordionItemProps> = React.forwardRef((props, ref) => {
  const state = useAccordionItem_unstable(props, ref);
  const contextValues = useAccordionItemContextValues_unstable(state);

  useAccordionItemStyles_unstable(state);

  return renderAccordionItem_unstable(state, contextValues);
});

AccordionItem.displayName = 'AccordionItem';

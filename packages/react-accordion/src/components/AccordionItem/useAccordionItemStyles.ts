import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { AccordionItemSlots, AccordionItemState } from './AccordionItem.types';

/**
 * @deprecated Use `accordionItemClassNames.root` instead.
 */
export const accordionItemClassName = 'fui-AccordionItem';
export const accordionItemClassNames: SlotClassNames<AccordionItemSlots> = {
  root: 'fui-AccordionItem',
};

export const useAccordionItemStyles_unstable = (state: AccordionItemState) => {
  state.root.className = mergeClasses(accordionItemClassNames.root, state.root.className);

  return state;
};

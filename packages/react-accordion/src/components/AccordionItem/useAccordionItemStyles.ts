import { mergeClasses } from '@griffel/react';
import type { AccordionItemState } from './AccordionItem.types';

export const accordionItemClassName = 'fui-AccordionItem';

export const useAccordionItemStyles_unstable = (state: AccordionItemState) => {
  state.root.className = mergeClasses(accordionItemClassName, state.root.className);

  return state;
};

import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { AccordionItemSlots, AccordionItemState } from './AccordionItem.types';

export const accordionItemClassNames: SlotClassNames<AccordionItemSlots> = {
  root: 'fui-AccordionItem',
};

export const useAccordionItemStyles_unstable = (state: AccordionItemState) => {
  'use no memo';

  state.root.className = mergeClasses(accordionItemClassNames.root, state.root.className);

  return state;
};

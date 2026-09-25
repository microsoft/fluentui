import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionItemSlots, AccordionItemState } from './AccordionItem.types';

export const accordionItemClassNames: SlotClassNames<AccordionItemSlots> = {
  root: 'fui-AccordionItem',
};

export const useAccordionItemStyles = (state: AccordionItemState): AccordionItemState => {
  state.root.className = clsx(accordionItemClassNames.root, state.root.className);

  return state;
};

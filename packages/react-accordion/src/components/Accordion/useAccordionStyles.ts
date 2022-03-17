import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { AccordionSlots, AccordionState } from './Accordion.types';

/**
 * @deprecated Use `accordionClassNames.root` instead.
 */
export const accordionClassName = 'fui-Accordion';
export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

export const useAccordionStyles_unstable = (state: AccordionState) => {
  state.root.className = mergeClasses(accordionClassNames.root, state.root.className);

  return state;
};

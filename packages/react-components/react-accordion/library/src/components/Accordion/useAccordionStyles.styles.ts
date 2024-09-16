import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { AccordionSlots, AccordionState } from './Accordion.types';

export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

export const useAccordionStyles_unstable = (state: AccordionState) => {
  'use no memo';

  state.root.className = mergeClasses(accordionClassNames.root, state.root.className);

  return state;
};

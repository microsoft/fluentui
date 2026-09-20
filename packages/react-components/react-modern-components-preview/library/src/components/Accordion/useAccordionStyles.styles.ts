import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { AccordionSlots, AccordionState } from './Accordion.types';

export const accordionClassNames: SlotClassNames<AccordionSlots> = {
  root: 'fui-Accordion',
};

export const useAccordionStyles = (state: AccordionState): AccordionState => {
  state.root.className = clsx(accordionClassNames.root, state.root.className);

  return state;
};

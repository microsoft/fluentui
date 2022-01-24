import { mergeClasses } from '@griffel/react';
import type { AccordionState } from './Accordion.types';

export const accordionClassName = 'fui-Accordion';

export const useAccordionStyles = (state: AccordionState) => {
  state.root.className = mergeClasses(accordionClassName, state.root.className);

  return state;
};

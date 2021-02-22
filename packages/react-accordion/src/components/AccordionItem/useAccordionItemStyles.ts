import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AccordionItemState } from './AccordionItem.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<AccordionItemState>([]);

/** Applies style classnames to slots */
export const useAccordionItemStyles = (state: AccordionItemState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);

  return state;
};

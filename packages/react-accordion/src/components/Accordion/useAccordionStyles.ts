import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AccordionState } from './Accordion.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<AccordionState>([]);

/** Applies style classnames to slots */
export const useAccordionStyles = (state: AccordionState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);

  return state;
};

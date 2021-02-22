import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AccordionHeaderState } from './AccordionHeader.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles<AccordionHeaderState>([]);

/** Applies style classnames to slots */
export const useAccordionHeaderStyles = (state: AccordionHeaderState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);

  return state;
};

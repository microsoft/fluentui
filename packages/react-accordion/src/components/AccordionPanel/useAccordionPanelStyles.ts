import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { AccordionPanelState } from './AccordionPanel.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    marginRight: '12px',
    marginLeft: '12px',
  },
});

/** Applies style classnames to slots */
export const useAccordionPanelStyles = (state: AccordionPanelState) => {
  const styles = useStyles();
  state.className = useAx(styles.root, state.className);

  return state;
};

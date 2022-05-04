import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { AccordionPanelSlots, AccordionPanelState } from './AccordionPanel.types';

/**
 * @deprecated Use `accordionPanelClassNames.root` instead.
 */
export const accordionPanelClassName = 'fui-AccordionPanel';
export const accordionPanelClassNames: SlotClassNames<AccordionPanelSlots> = {
  root: 'fui-AccordionPanel',
};

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
export const useAccordionPanelStyles_unstable = (state: AccordionPanelState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(accordionPanelClassNames.root, styles.root, state.root.className);

  return state;
};

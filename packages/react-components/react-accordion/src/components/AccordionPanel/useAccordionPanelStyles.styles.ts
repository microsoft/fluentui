import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

import type { AccordionPanelSlots, AccordionPanelState } from './AccordionPanel.types';

export const accordionPanelClassNames: SlotClassNames<AccordionPanelSlots> = {
  root: 'fui-AccordionPanel',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.margin(0, tokens.spacingHorizontalM),
  },
});

/** Applies style classnames to slots */
export const useAccordionPanelStyles_unstable = (state: AccordionPanelState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(accordionPanelClassNames.root, styles.root, state.root.className);

  return state;
};

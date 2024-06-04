import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerFooterSlots, NavDrawerFooterState } from './NavDrawerFooter.types';

export const navDrawerFooterClassNames: SlotClassNames<NavDrawerFooterSlots> = {
  root: 'fui-NavDrawerFooter',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'unset',
    padding: `2px ${tokens.spacingVerticalMNudge}`,
  },
});

/**
 * Apply styling to the NavDrawerFooter slots based on the state
 */
export const useNavDrawerFooterStyles_unstable = (state: NavDrawerFooterState): NavDrawerFooterState => {
  useDrawerFooterStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerFooterClassNames.root, styles.root, state.root.className);

  return state;
};

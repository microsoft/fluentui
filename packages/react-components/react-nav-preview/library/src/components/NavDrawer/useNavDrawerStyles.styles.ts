import { makeStyles, mergeClasses } from '@griffel/react';
import type { InlineDrawerSlots } from '@fluentui/react-drawer';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerState } from './NavDrawer.types';
import { navItemTokens } from '../sharedNavStyles.styles';

export const navDrawerClassNames: SlotClassNames<InlineDrawerSlots> = {
  root: 'fui-NavDrawer',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    width: '260px', // per spec
    backgroundColor: navItemTokens.backgroundColor,
    alignItems: 'unset',
  },
});

/**
 * Apply styling to the NavDrawer slots based on the state
 */
export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(navDrawerClassNames.root, styles.root, state.root.className);

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { InlineDrawerSlots } from '@fluentui/react-drawer';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDrawerState } from './NavDrawer.types';
import { navItemTokens } from '../sharedNavStyles.styles';

export const navDrawerClassNames: SlotClassNames<Omit<InlineDrawerSlots, 'surfaceMotion'>> = {
  root: 'fui-NavDrawer',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: navItemTokens.backgroundColor,
    alignItems: 'unset',
  },
  // seperate style so it can be applied conditionally
  // if size is not set, use default width from the token.
  defaultWidth: {
    width: `${navItemTokens.defaultDrawerWidth}px`,
  },
});

/**
 * Apply styling to the NavDrawer slots based on the state
 */
export const useNavDrawerStyles_unstable = (state: NavDrawerState): NavDrawerState => {
  'use no memo';

  const { size } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(
    navDrawerClassNames.root,
    styles.root,
    !size && styles.defaultWidth,
    state.root.className,
  );

  return state;
};

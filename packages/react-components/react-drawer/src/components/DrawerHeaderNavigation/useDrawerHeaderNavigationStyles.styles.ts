import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerHeaderNavigationSlots, DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerHeaderNavigationClassNames: SlotClassNames<DrawerHeaderNavigationSlots> = {
  root: 'fui-DrawerHeaderNavigation',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.margin(`calc(${tokens.spacingVerticalS} * -1)`, `calc(${tokens.spacingHorizontalL} * -1)`),

    order: 0,
  },
});

/**
 * Apply styling to the DrawerHeaderNavigation slots based on the state
 */
export const useDrawerHeaderNavigationStyles_unstable = (
  state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerHeaderNavigationClassNames.root, styles.root, state.root.className);

  return state;
};

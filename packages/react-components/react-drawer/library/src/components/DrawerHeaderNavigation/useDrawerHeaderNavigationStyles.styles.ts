import { makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerHeaderNavigationSlots, DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

export const drawerHeaderNavigationClassNames: SlotClassNames<DrawerHeaderNavigationSlots> = {
  root: 'fui-DrawerHeaderNavigation',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  margin: `calc(${tokens.spacingVerticalS} * -1) calc(${tokens.spacingHorizontalL} * -1)`,
});

/**
 * Apply styling to the DrawerHeaderNavigation slots based on the state
 */
export const useDrawerHeaderNavigationStyles_unstable = (
  state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(drawerHeaderNavigationClassNames.root, styles, state.root.className);

  return state;
};

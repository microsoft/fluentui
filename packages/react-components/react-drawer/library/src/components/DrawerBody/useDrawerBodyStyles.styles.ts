import { makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerBodySlots, DrawerBodyState } from './DrawerBody.types';

export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
  root: 'fui-DrawerBody',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  padding: `0 ${tokens.spacingHorizontalXXL}`,
  flex: 1,
  alignSelf: 'stretch',
  position: 'relative',
  zIndex: 1,
  overflow: 'auto',

  ':last-child': {
    paddingBottom: `calc(${tokens.spacingHorizontalXXL} + 1px)`,
  },

  ':first-child': {
    paddingTop: `calc(${tokens.spacingHorizontalXXL} + 1px)`,
  },
});

/**
 * Apply styling to the DrawerBody slots based on the state
 */
export const useDrawerBodyStyles_unstable = (state: DrawerBodyState): DrawerBodyState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(drawerBodyClassNames.root, styles, state.root.className);

  return state;
};

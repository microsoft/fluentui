import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerHeaderSlots, DrawerHeaderState } from './DrawerHeader.types';

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
  root: 'fui-DrawerHeader',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL, tokens.spacingVerticalS),
    ...shorthands.gap(tokens.spacingHorizontalS),

    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the DrawerHeader slots based on the state
 */
export const useDrawerHeaderStyles_unstable = (state: DrawerHeaderState): DrawerHeaderState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerHeaderClassNames.root, styles.root, state.root.className);

  return state;
};

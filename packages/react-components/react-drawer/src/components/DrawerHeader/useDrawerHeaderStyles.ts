import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerHeaderSlots, DrawerHeaderState } from './DrawerHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
  root: 'fui-DrawerHeader',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL, tokens.spacingVerticalS),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerHeaderTitleSlots, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerHeaderTitleClassNames: SlotClassNames<DrawerHeaderTitleSlots> = {
  root: 'fui-DrawerHeaderTitle',
  action: 'fui-DrawerHeaderTitle__action',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
  },

  action: {
    marginRight: `calc(${tokens.spacingHorizontalS} * -1)`,
  },
});

/**
 * Apply styling to the DrawerHeaderTitle slots based on the state
 */
export const useDrawerHeaderTitleStyles_unstable = (state: DrawerHeaderTitleState): DrawerHeaderTitleState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerHeaderTitleClassNames.root, styles.root, state.root.className);

  if (state.action) {
    state.action.className = mergeClasses(drawerHeaderTitleClassNames.action, styles.action, state.action.className);
  }

  return state;
};

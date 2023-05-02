import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerTitleSlots, DrawerTitleState } from './DrawerTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerTitleClassNames: SlotClassNames<DrawerTitleSlots> = {
  root: 'fui-DrawerTitle',
  action: 'fui-DrawerTitle__action',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  action: {
    marginRight: `calc(${tokens.spacingHorizontalS} * -1)`,
  },
});

/**
 * Apply styling to the DrawerTitle slots based on the state
 */
export const useDrawerTitleStyles_unstable = (state: DrawerTitleState): DrawerTitleState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerTitleClassNames.root, state.root.className);

  if (state.action) {
    state.action.className = mergeClasses(drawerTitleClassNames.action, styles.action, state.action.className);
  }

  return state;
};

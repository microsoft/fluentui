import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuListSlots, MenuListState } from './MenuList.types';

export const menuListClassNames: SlotClassNames<MenuListSlots> = {
  root: 'fui-MenuList',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  hasMenuContext: {
    height: '100%',
  },
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuListStyles_unstable = (state: MenuListState): MenuListState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    menuListClassNames.root,
    styles.root,
    state.hasMenuContext && styles.hasMenuContext,
    state.root.className,
  );
  return state;
};

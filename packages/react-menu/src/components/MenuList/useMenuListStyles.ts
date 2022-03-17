import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import type { MenuListSlots, MenuListState } from './MenuList.types';

/**
 * @deprecated Use `menuListClassNames.root` instead.
 */
export const menuListClassName = 'fui-MenuList';
export const menuListClassNames: SlotClassNames<MenuListSlots> = {
  root: 'fui-MenuList',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('2px'),
  },
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuListStyles_unstable = (state: MenuListState): MenuListState => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuListClassNames.root, styles.root, state.root.className);
  return state;
};

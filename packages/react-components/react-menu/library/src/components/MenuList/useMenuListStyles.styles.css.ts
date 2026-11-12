import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuListSlots, MenuListState } from './MenuList.types';
import styles from './MenuList.module.css';

export const menuListClassNames: SlotClassNames<MenuListSlots> = {
  root: 'fui-MenuList',
};

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuListStyles_unstable = (state: MenuListState): MenuListState => {
  state.root.className = clsx(
    menuListClassNames.root,
    styles.root,
    state.hasMenuContext && styles.hasMenuContext,
    state.root.className,
  );
  return state;
};

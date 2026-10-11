import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuListSlots, MenuListState } from './MenuList.types';
import styles from './MenuList.module.css';

export const menuListClassNames: SlotClassNames<MenuListSlots> = { root: 'fui-MenuList' };

export const useMenuListStyles = (state: MenuListState): MenuListState => {
  state.root.className = clsx(
    menuListClassNames.root,
    styles.menuList,
    state.hasMenuContext && styles.menuListWithContext,
    state.root.className,
  );
  return state;
};

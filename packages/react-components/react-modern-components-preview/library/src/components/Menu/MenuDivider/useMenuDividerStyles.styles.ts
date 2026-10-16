import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';
import styles from './MenuDivider.module.css';

export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = { root: 'fui-MenuDivider' };

export const useMenuDividerStyles = (state: MenuDividerState): MenuDividerState => {
  state.root.className = clsx(menuDividerClassNames.root, styles.menuDivider, state.root.className);
  return state;
};

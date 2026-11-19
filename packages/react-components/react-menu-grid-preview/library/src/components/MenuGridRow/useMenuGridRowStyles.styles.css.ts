import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGridRowSlots, MenuGridRowState } from './MenuGridRow.types';
import styles from './MenuGridRow.module.css';

export const menuGridRowClassNames: SlotClassNames<MenuGridRowSlots> = {
  root: 'fui-MenuGridRow',
};

export const useMenuGridRowStyles_unstable = (state: MenuGridRowState): MenuGridRowState => {
  state.root.className = clsx(menuGridRowClassNames.root, styles.root, state.root.className);

  return state;
};

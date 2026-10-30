import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';
import styles from './MenuGridCell.module.css';

export const menuGridCellClassNames: SlotClassNames<MenuGridCellSlots> = {
  root: 'fui-MenuGridCell',
};

export const useMenuGridCellStyles_unstable = (state: MenuGridCellState): MenuGridCellState => {
  state.root.className = clsx(
    menuGridCellClassNames.root,
    styles.root,
    state.visuallyHidden && styles.visuallyHidden,
    state.root.className,
  );

  return state;
};

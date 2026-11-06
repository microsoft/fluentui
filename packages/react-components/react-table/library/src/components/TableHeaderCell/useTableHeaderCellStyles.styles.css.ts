import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableHeaderCellSlots, TableHeaderCellState } from './TableHeaderCell.types';
import styles from './TableHeaderCell.module.css';

export const tableHeaderCellClassName = 'fui-TableHeaderCell';

export const tableHeaderCellClassNames: SlotClassNames<TableHeaderCellSlots> = {
  root: 'fui-TableHeaderCell',
  button: 'fui-TableHeaderCell__button',
  sortIcon: 'fui-TableHeaderCell__sortIcon',
  aside: 'fui-TableHeaderCell__aside',
};

export const useTableHeaderCellStyles_unstable = (state: TableHeaderCellState): TableHeaderCellState => {
  state.root.className = clsx(
    tableHeaderCellClassNames.root,
    styles.root,
    state.sortable && styles.sortable,
    styles[state.noNativeElements ? 'flex' : 'table'],
    state.root.className,
  );

  state.button.className = clsx(tableHeaderCellClassNames.button, styles.button, state.button.className);
  if (state.sortIcon) {
    state.sortIcon.className = clsx(tableHeaderCellClassNames.sortIcon, styles.sortIcon, state.sortIcon.className);
  }
  if (state.aside) {
    state.aside.className = clsx(tableHeaderCellClassNames.aside, state.aside.className);
  }
  return state;
};

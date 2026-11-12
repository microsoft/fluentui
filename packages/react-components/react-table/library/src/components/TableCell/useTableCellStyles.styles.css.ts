import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableCellSlots, TableCellState } from './TableCell.types';
import styles from './TableCell.module.css';

export const tableCellClassName = 'fui-TableCell';

export const tableCellClassNames: SlotClassNames<TableCellSlots> = {
  root: tableCellClassName,
};

export const useTableCellStyles_unstable = (state: TableCellState): TableCellState => {
  state.root.className = clsx(
    tableCellClassNames.root,
    styles.root,
    styles[state.noNativeElements ? 'flex' : 'table'],
    styles[state.size],
    state.root.className,
  );
  return state;
};

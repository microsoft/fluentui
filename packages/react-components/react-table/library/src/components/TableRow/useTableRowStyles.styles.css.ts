import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import styles from './TableRow.module.css';

export const tableRowClassName = 'fui-TableRow';

export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
  root: tableRowClassName,
};

export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  state.root.className = clsx(
    tableRowClassNames.root,
    styles.root,
    !state.isHeaderRow && styles.interactive,
    styles[state.size],
    styles[state.noNativeElements ? 'flex' : 'table'],
    styles[state.appearance],
    state.root.className,
  );
  return state;
};

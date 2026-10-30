import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableSlots, TableState } from './Table.types';
import styles from './Table.module.css';

export const tableClassName = 'fui-Table';

export const tableClassNames: SlotClassNames<TableSlots> = {
  root: 'fui-Table',
};

export const useTableStyles_unstable = (state: TableState): TableState => {
  state.root.className = clsx(
    tableClassNames.root,
    styles.root,
    styles[state.noNativeElements ? 'flex' : 'table'],
    state.root.className,
  );
  return state;
};

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableCellActionsSlots, TableCellActionsState } from './TableCellActions.types';
import styles from './TableCellActions.module.css';

export const tableCellActionsClassNames: SlotClassNames<TableCellActionsSlots> = {
  root: 'fui-TableCellActions',
};

export const useTableCellActionsStyles_unstable = (state: TableCellActionsState): TableCellActionsState => {
  state.root.className = clsx(
    tableCellActionsClassNames.root,
    styles.root,
    state.visible && styles.visible,
    state.root.className,
  );
  return state;
};

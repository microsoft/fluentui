import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TableSelectionCellSlots, TableSelectionCellState } from './TableSelectionCell.types';
import styles from './TableSelectionCell.module.css';

export const CELL_WIDTH = 44;

export const tableSelectionCellClassNames: SlotClassNames<TableSelectionCellSlots> = {
  root: 'fui-TableSelectionCell',
  checkboxIndicator: 'fui-TableSelectionCell__checkboxIndicator',
  radioIndicator: 'fui-TableSelectionCell__radioIndicator',
};

export const useTableSelectionCellStyles_unstable = (state: TableSelectionCellState): TableSelectionCellState => {
  state.root.className = clsx(
    tableSelectionCellClassNames.root,
    styles.root,
    styles[state.noNativeElements ? 'flex' : 'table'],
    state.subtle && state.checked === false && styles.subtle,
    state.hidden && styles.hidden,
    state.root.className,
  );
  if (state.checkboxIndicator) {
    state.checkboxIndicator.className = clsx(
      tableSelectionCellClassNames.checkboxIndicator,
      state.checkboxIndicator.className,
    );
  }
  if (state.radioIndicator) {
    state.radioIndicator.className = clsx(
      tableSelectionCellClassNames.radioIndicator,
      styles.radioIndicator,
      state.radioIndicator.className,
    );
  }
  return state;
};

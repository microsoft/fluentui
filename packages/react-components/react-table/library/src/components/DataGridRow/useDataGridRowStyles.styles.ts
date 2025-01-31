import { makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { DataGridRowSlots, DataGridRowState } from './DataGridRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableRowStyles_unstable } from '../TableRow/useTableRowStyles.styles';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { tableSelectionCellClassNames } from '../TableSelectionCell/useTableSelectionCellStyles.styles';

export const dataGridRowClassNames: SlotClassNames<DataGridRowSlots> = {
  root: 'fui-DataGridRow',
  selectionCell: 'fui-DataGridRow__selectionCell',
};

const useStyles = makeStyles({
  singleSelectHeader: {
    ...createCustomFocusIndicatorStyle(
      {
        [`& .${tableSelectionCellClassNames.root}`]: {
          opacity: 0,
        },
      },
      { selector: 'focus-within' },
    ),

    ':hover': {
      [`& .${tableSelectionCellClassNames.root}`]: {
        opacity: 0,
      },
    },
  },

  subtleSelection: {
    ...createCustomFocusIndicatorStyle(
      {
        [`& .${tableSelectionCellClassNames.root}`]: {
          opacity: 1,
        },
      },
      { selector: 'focus-within' },
    ),

    ':hover': {
      [`& .${tableSelectionCellClassNames.root}`]: {
        opacity: 1,
      },
    },
  },
});

/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useDataGridRowStyles_unstable = (state: DataGridRowState): DataGridRowState => {
  'use no memo';

  const isHeader = useIsInTableHeader();
  const isSingleSelect = useDataGridContext_unstable(ctx => ctx.selection.selectionMode === 'single');
  const isSubtle = useDataGridContext_unstable(ctx => ctx.subtleSelection);
  const styles = useStyles();

  useTableRowStyles_unstable(state);
  state.root.className = mergeClasses(
    dataGridRowClassNames.root,
    state.root.className,
    isSubtle && styles.subtleSelection,
    isHeader && isSingleSelect && styles.singleSelectHeader,
  );
  if (state.selectionCell) {
    state.selectionCell.className = mergeClasses(dataGridRowClassNames.selectionCell, state.selectionCell.className);
  }

  return state;
};

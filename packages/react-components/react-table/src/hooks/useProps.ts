import * as React from 'react';
import { Space } from '@fluentui/keyboard-keys';
import { ColumnId, RowId, TableState, TablePropsState } from './types';
import { defaultTableSortState } from './useSort';
import { defaultTableSelectionState } from './useSelection';

const noop = () => ({});

export const defaultTablePropsState: TablePropsState = {
  tableHeaderCell: noop,
  tableSelectionCell: noop,
  tableHeaderSelectionCell: noop,
  tableRow: noop,
};

export function useProps<TItem>() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableState<TItem>) => usePropsState(tableState);
}

export function usePropsState<TItem>(tableState: TableState<TItem>): TableState<TItem> {
  const { sort, selection } = tableState;

  const sortEnabled = sort !== defaultTableSortState;
  const selectionEnabled = selection !== defaultTableSelectionState;

  const { toggleColumnSort, getSortDirection } = sort;
  const { isRowSelected, toggleAllRows, allRowsSelected, someRowsSelected, toggleRow } = selection;

  const tableHeaderCell = (columnId: ColumnId) => {
    if (!sortEnabled) {
      return defaultTablePropsState.tableHeaderCell(columnId);
    }

    return {
      onClick: () => {
        toggleColumnSort(columnId);
      },
      sortDirection: getSortDirection(columnId),
    };
  };

  const tableSelectionCell = (rowId: RowId) => {
    if (!selectionEnabled) {
      return defaultTablePropsState.tableSelectionCell(rowId);
    }

    return {
      checked: isRowSelected(rowId),
      checkboxIndicator: { tabIndex: -1 },
      type: selection.selectionMode === 'single' ? ('radio' as const) : ('checkbox' as const),
    };
  };

  const tableHeaderSelectionCell = () => {
    if (!selectionEnabled) {
      return defaultTablePropsState.tableHeaderSelectionCell();
    }

    if (selection.selectionMode === 'single') {
      return {
        ...defaultTablePropsState.tableHeaderSelectionCell(),
        type: 'radio',
      };
    }

    return {
      onClick: () => {
        toggleAllRows();
      },
      checked: allRowsSelected ? true : someRowsSelected ? ('mixed' as const) : false,
    };
  };

  const tableRow = (rowId: RowId) => {
    if (!selectionEnabled) {
      return defaultTablePropsState.tableRow(rowId);
    }

    return {
      tabIndex: 0,
      onClick: () => toggleRow(rowId),
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === Space) {
          toggleRow(rowId);
        }
      },
      'aria-selected': isRowSelected(rowId),
    };
  };

  return {
    ...tableState,
    props: {
      tableHeaderCell,
      tableSelectionCell,
      tableHeaderSelectionCell,
      tableRow,
    },
  };
}

import * as React from 'react';
import type { UseTableOptions, TableState } from './types';
import { useSelection } from './useSelection';
import { useSort } from './useSort';

export function useTable<TItem>(options: UseTableOptions<TItem>): TableState<TItem> {
  const {
    items: baseItems,
    columns,
    getRowId: getUserRowId = () => undefined,
    selectionMode = 'multiselect',
  } = options;

  const getRowId = React.useCallback((item: TItem, index: number) => getUserRowId(item) ?? index, [getUserRowId]);
  const { sortColumn, sortDirection, toggleColumnSort, setColumnSort, headerSortProps, sort } = useSort(columns);

  const {
    toggleRowSelect,
    toggleSelectAllRows,
    selectedRows,
    allRowsSelected,
    someRowsSelected,
    clearSelection,
    selectRow,
    deSelectRow,
  } = useSelection(selectionMode, baseItems, getRowId);

  const rows = React.useMemo(
    () =>
      sort(baseItems).map((item, i) => ({
        item,
        deSelectRow: () => deSelectRow(getRowId(item, i)),
        selectRow: () => selectRow(getRowId(item, i)),
        toggleSelect: () => toggleRowSelect(getRowId(item, i)),
        selected: selectedRows.has(getRowId(item, i)),
        rowId: getRowId(item, i),
      })),
    [baseItems, selectedRows, sort, toggleRowSelect, getRowId, selectRow, deSelectRow],
  );

  return {
    rows,
    selection: {
      clearSelection,
      deSelectRow,
      selectRow,
      toggleSelectAllRows,
      toggleRowSelect,
      selectedRows: Array.from(selectedRows),
      allRowsSelected,
      someRowsSelected,
    },
    sort: {
      sortColumn,
      sortDirection,
      setColumnSort,
      toggleColumnSort,
      headerSortProps,
    },
  };
}

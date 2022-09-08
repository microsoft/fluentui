import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';
import type {
  ColumnId,
  OnSortChangeCallback,
  RowEnhancer,
  RowState,
  SortState,
  TableSortStateInternal,
  TableState,
} from './types';

interface UseSortOptions {
  /**
   * Used to control sorting
   */
  sortState?: SortState;
  /**
   * Used in uncontrolled mode to set initial sort column and direction on mount
   */
  defaultSortState?: SortState;
  /**
   * Called when sort changes
   */
  onSortChange?: OnSortChangeCallback;
}

const defaultRowEnhancer: RowEnhancer<unknown, RowState<unknown>> = row => row;
export function useSort<TItem>(tableState: TableState<TItem>, options: UseSortOptions): TableState<TItem> {
  const { columns, items, getRowId } = tableState;
  const { sortState, defaultSortState, onSortChange } = options;

  const [sorted, setSorted] = useControllableState<SortState>({
    initialState: {
      sortDirection: 'ascending' as const,
      sortColumn: undefined,
    },
    defaultState: defaultSortState,
    state: sortState,
  });

  const { sortColumn, sortDirection } = sorted;

  const toggleColumnSort = (columnId: ColumnId | undefined) => {
    setSorted(s => {
      const newState = { ...s, sortColumn: columnId };
      if (s.sortColumn === columnId) {
        newState.sortDirection = s.sortDirection === 'ascending' ? 'descending' : 'ascending';
      } else {
        newState.sortDirection = 'ascending';
      }

      onSortChange?.(newState);
      return newState;
    });
  };

  const setColumnSort: TableSortStateInternal<TItem>['setColumnSort'] = (nextSortColumn, nextSortDirection) => {
    const newState = { sortColumn: nextSortColumn, sortDirection: nextSortDirection };
    onSortChange?.(newState);
    setSorted(newState);
  };

  const sort = React.useCallback(
    (itemsA: TItem[]) =>
      itemsA.slice().sort((a, b) => {
        const sortColumnDef = columns.find(column => column.columnId === sortColumn);
        if (!sortColumnDef?.compare) {
          return 0;
        }

        const mod = sortDirection === 'ascending' ? 1 : -1;
        return sortColumnDef.compare(a, b) * mod;
      }),
    [sortDirection, sortColumn, columns],
  );

  const getSortDirection: TableSortStateInternal<TItem>['getSortDirection'] = (columnId: ColumnId) => {
    return sortColumn === columnId ? sortDirection : undefined;
  };

  const rows = <TRowState extends RowState<TItem>>(
    rowEnhancer = defaultRowEnhancer as RowEnhancer<TItem, TRowState>,
  ) => {
    return sort(items).map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));
  };

  return {
    ...tableState,
    rows,
    sort: {
      sortColumn,
      sortDirection,
      setColumnSort,
      toggleColumnSort,
      getSortDirection,
    },
  };
}

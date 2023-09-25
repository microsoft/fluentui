import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';
import type {
  TableColumnId,
  TableRowData,
  SortState,
  TableSortState,
  TableFeaturesState,
  UseTableSortOptions,
} from './types';

const noop = () => undefined;

export const defaultTableSortState: TableSortState<unknown> = {
  getSortDirection: () => 'ascending',
  setColumnSort: noop,
  sort: <TRowState extends TableRowData<unknown>>(rows: TRowState[]) => [...rows],
  sortColumn: undefined,
  sortDirection: 'ascending',
  toggleColumnSort: noop,
};

export function useTableSort<TItem>(options: UseTableSortOptions) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableSortState(tableState, options);
}

export function useTableSortState<TItem>(
  tableState: TableFeaturesState<TItem>,
  options: UseTableSortOptions,
): TableFeaturesState<TItem> {
  const { columns } = tableState;
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

  const toggleColumnSort = (e: React.SyntheticEvent, columnId: TableColumnId | undefined) => {
    setSorted(s => {
      const newState = { ...s, sortColumn: columnId };
      if (s.sortColumn === columnId) {
        newState.sortDirection = s.sortDirection === 'ascending' ? 'descending' : 'ascending';
      } else {
        newState.sortDirection = 'ascending';
      }

      onSortChange?.(e, newState);
      return newState;
    });
  };

  const setColumnSort: TableSortState<TItem>['setColumnSort'] = (e, nextSortColumn, nextSortDirection) => {
    const newState = { sortColumn: nextSortColumn, sortDirection: nextSortDirection };
    onSortChange?.(e, newState);
    setSorted(newState);
  };

  const sort = <TRowState extends TableRowData<TItem>>(rows: TRowState[]) => {
    return rows.slice().sort((a, b) => {
      const sortColumnDef = columns.find(column => column.columnId === sortColumn);
      if (!sortColumnDef?.compare) {
        return 0;
      }

      const mod = sortDirection === 'ascending' ? 1 : -1;
      return sortColumnDef.compare(a.item, b.item) * mod;
    });
  };

  const getSortDirection: TableSortState<TItem>['getSortDirection'] = (columnId: TableColumnId) => {
    return sortColumn === columnId ? sortDirection : undefined;
  };

  return {
    ...tableState,
    sort: {
      sort,
      sortColumn,
      sortDirection,
      setColumnSort,
      toggleColumnSort,
      getSortDirection,
    },
  };
}

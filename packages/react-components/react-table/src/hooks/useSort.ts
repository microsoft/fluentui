import * as React from 'react';
import { ColumnDefinition, ColumnId, SortColumnState, SortStateInternal, UseTableSortOptions } from './types';

export function useSort<TItem>(
  columns: ColumnDefinition<TItem>[],
  onSortColumnChange: UseTableSortOptions['onSortColumnChange'] = () => undefined,
  defaultSortColumn?: UseTableSortOptions['defaultSortColumn'],
): SortStateInternal<TItem> {
  const [sorted, setSorted] = React.useState<SortColumnState>(
    defaultSortColumn ?? {
      sortDirection: 'ascending' as const,
      sortColumn: undefined,
    },
  );

  const { sortColumn, sortDirection } = sorted;

  const toggleColumnSort = (columnId: ColumnId | undefined) => {
    setSorted(s => {
      const newState = { ...s, sortColumn: columnId };
      if (s.sortColumn === columnId) {
        newState.sortDirection = s.sortDirection === 'ascending' ? 'descending' : 'ascending';
      } else {
        newState.sortDirection = 'ascending';
      }

      onSortColumnChange(newState);
      return newState;
    });
  };

  const setColumnSort: SortStateInternal<TItem>['setColumnSort'] = (nextSortColumn, nextSortDirection) => {
    onSortColumnChange({ sortColumn: nextSortColumn, sortDirection: nextSortDirection });
    setSorted({ sortColumn: nextSortColumn, sortDirection: nextSortDirection });
  };

  const sort = (items: TItem[]) =>
    items.slice().sort((a, b) => {
      const sortColumnDef = columns.find(column => column.columnId === sortColumn);
      if (!sortColumnDef?.compare) {
        return 0;
      }

      const mod = sortDirection === 'ascending' ? 1 : -1;
      return sortColumnDef.compare(a, b) * mod;
    });

  const getSortDirection: SortStateInternal<TItem>['getSortDirection'] = (columnId: ColumnId) => {
    return sortColumn === columnId ? sortDirection : undefined;
  };

  return {
    sortColumn,
    sortDirection,
    sort,
    setColumnSort,
    toggleColumnSort,
    getSortDirection,
  };
}

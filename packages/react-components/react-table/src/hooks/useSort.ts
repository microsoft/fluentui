import { SortDirection } from '../components/Table/Table.types';
import { useControllableState } from '@fluentui/react-utilities';
import type { ColumnDefinition, ColumnId, OnSortChangeCallback, SortStateInternal } from './types';

interface SortState {
  sortDirection: SortDirection;
  sortColumn: ColumnId | undefined;
}

interface UseSortOptions<TItem> {
  columns: ColumnDefinition<TItem>[];
  sortState?: SortState;
  defaultSortState?: SortState;
  onSortChange?: OnSortChangeCallback;
}

export function useSort<TItem>(options: UseSortOptions<TItem>): SortStateInternal<TItem> {
  const { columns, sortState, defaultSortState, onSortChange } = options;

  const [sorted, setSorted] = useControllableState({
    initialState: {
      sortDirection: 'ascending' as SortDirection,
      sortColumn: undefined as ColumnId | undefined,
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

  const setColumnSort: SortStateInternal<TItem>['setColumnSort'] = (nextSortColumn, nextSortDirection) => {
    const newState = { sortColumn: nextSortColumn, sortDirection: nextSortDirection };
    onSortChange?.(newState);
    setSorted(newState);
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

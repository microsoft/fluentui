import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';
import { TablePaginationState, TableState } from './types';

interface UsePaginationOptions {
  pageSize: number;
  currentPage?: number;
  defaultPage?: number;
}

export const defaultPaginationState: TablePaginationState<unknown> = {
  currentPage: 0,
  getPageRows: () => [],
  nextPage: () => null,
  pageCount: 0,
  prevPage: () => null,
  setPage: () => null,
};

export function usePagination<TItem>(tableState: TableState<TItem>, options: UsePaginationOptions): TableState<TItem> {
  const { items } = tableState;
  const { currentPage, defaultPage, pageSize } = options;
  const pageCount = Math.ceil(items.length / pageSize);
  const [page, setPage] = useControllableState<number>({
    initialState: 0,
    defaultState: defaultPage,
    state: currentPage,
  });

  React.useEffect(() => {
    setPage(0);
  }, [pageSize, setPage]);

  return {
    ...tableState,
    pagination: {
      currentPage: page,
      pageCount,
      setPage: (newPage: number) => setPage(newPage),
      nextPage: () => setPage(p => Math.min(p + 1, pageCount)),
      prevPage: () => setPage(p => Math.max(p - 1, 0)),
      getPageRows: rows => rows.slice(page * pageSize, (page + 1) * pageSize),
    },
  };
}

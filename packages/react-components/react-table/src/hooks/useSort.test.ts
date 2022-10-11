import { renderHook, act } from '@testing-library/react-hooks';
import { ColumnDefinition } from './types';
import { useSortState } from './useSort';
import { mockTableState } from '../common/mockTableState';

describe('useSortState', () => {
  it('should use default sort state', () => {
    const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
    const { result } = renderHook(() =>
      useSortState(mockTableState({ columns: columnDefinition }), {
        defaultSortState: { sortColumn: 2, sortDirection: 'descending' },
      }),
    );

    expect(result.current.sort.getSortDirection(2)).toBe('descending');
    expect(result.current.sort.sortColumn).toBe(2);
  });

  it('should use user sort state', () => {
    const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
    const { result } = renderHook(() =>
      useSortState(mockTableState({ columns: columnDefinition }), {
        sortState: { sortColumn: 2, sortDirection: 'descending' },
      }),
    );

    expect(result.current.sort.getSortDirection(2)).toBe('descending');
    expect(result.current.sort.sortColumn).toBe(2);
  });

  describe('toggleColumnSort', () => {
    it('should sort a new column in ascending order', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.toggleColumnSort(1);
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('ascending');
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith({ sortColumn: 1, sortDirection: 'ascending' });
    });

    it('should toggle sort direction on a column', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.toggleColumnSort(1);
      });

      act(() => {
        result.current.sort.toggleColumnSort(1);
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('descending');
      expect(onSortChange).toHaveBeenCalledTimes(2);
      expect(onSortChange).toHaveBeenNthCalledWith(2, { sortColumn: 1, sortDirection: 'descending' });
    });
  });

  describe('setColumnSort', () => {
    it('should sort a column in ascending order', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.setColumnSort(1, 'ascending');
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('ascending');
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith({ sortColumn: 1, sortDirection: 'ascending' });
    });

    it('should sort a column in descending order', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.setColumnSort(1, 'descending');
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('descending');
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith({ sortColumn: 1, sortDirection: 'descending' });
    });
  });

  describe('sort', () => {
    const createMockCompare = () => (jest.fn() as unknown) as ColumnDefinition<{}>['compare'];
    it('should use the compare function for the sorted column', () => {
      const compare = createMockCompare();
      const columnDefinition = [
        { columnId: 1, compare: createMockCompare() },
        { columnId: 2, compare },
        { columnId: 3, compare: createMockCompare() },
      ];

      const { result } = renderHook(() => useSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.toggleColumnSort(2);
      });

      result.current.sort.sort([
        { rowId: 0, item: {} },
        { rowId: 1, item: {} },
      ]);
      expect(compare).toHaveBeenCalledTimes(1);
    });

    it('should sort ascending', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [
        { columnId: 1, compare: (a, b) => a.value - b.value },
      ];

      const { result } = renderHook(() => useSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.toggleColumnSort(1);
      });

      const rows = [
        { rowId: 0, item: { value: 2 } },
        { rowId: 0, item: { value: 1 } },
      ];
      const sorted = result.current.sort.sort(rows);
      expect(sorted).toEqual([
        { rowId: 0, item: { value: 1 } },
        { rowId: 0, item: { value: 2 } },
      ]);
    });

    it('should sort descending', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [
        { columnId: 1, compare: (a, b) => a.value - b.value },
      ];

      const items = [{ value: 1 }, { value: 2 }];
      const { result } = renderHook(() => useSortState(mockTableState({ items, columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.toggleColumnSort(1);
      });
      act(() => {
        result.current.sort.toggleColumnSort(1);
      });

      const rows = [
        { rowId: 0, item: { value: 1 } },
        { rowId: 0, item: { value: 2 } },
      ];
      const sorted = result.current.sort.sort(rows);
      expect(sorted).toEqual([
        { rowId: 0, item: { value: 2 } },
        { rowId: 0, item: { value: 1 } },
      ]);
    });
  });

  describe('getSortDirection', () => {
    it('should return sort direction for the sorted column', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [{ columnId: 1 }];

      const { result } = renderHook(() => useSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.setColumnSort(1, 'descending');
      });

      expect(result.current.sort.getSortDirection(1)).toEqual('descending');
    });

    it('should return undefined for unsorted column', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [{ columnId: 1 }, { columnId: 2 }];

      const { result } = renderHook(() => useSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.setColumnSort(1, 'descending');
      });

      expect(result.current.sort.getSortDirection(2)).toBeUndefined();
    });
  });
});

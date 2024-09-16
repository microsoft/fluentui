import { renderHook, act } from '@testing-library/react-hooks';
import { TableColumnDefinition } from './types';
import { useTableSortState } from './useTableSort';
import { mockTableState } from '../testing/mockTableState';
import { createTableColumn } from './createColumn';
import { mockSyntheticEvent } from '../testing/mockSyntheticEvent';

describe('useTableSortState', () => {
  it('should use default sort state', () => {
    const columnDefinition = [
      createTableColumn({ columnId: 1 }),
      createTableColumn({ columnId: 2 }),
      createTableColumn({ columnId: 3 }),
    ];
    const { result } = renderHook(() =>
      useTableSortState(mockTableState({ columns: columnDefinition }), {
        defaultSortState: { sortColumn: 2, sortDirection: 'descending' },
      }),
    );

    expect(result.current.sort.getSortDirection(2)).toBe('descending');
    expect(result.current.sort.sortColumn).toBe(2);
  });

  it('should use user sort state', () => {
    const columnDefinition = [
      createTableColumn({ columnId: 1 }),
      createTableColumn({ columnId: 2 }),
      createTableColumn({ columnId: 3 }),
    ];
    const { result } = renderHook(() =>
      useTableSortState(mockTableState({ columns: columnDefinition }), {
        sortState: { sortColumn: 2, sortDirection: 'descending' },
      }),
    );

    expect(result.current.sort.getSortDirection(2)).toBe('descending');
    expect(result.current.sort.sortColumn).toBe(2);
  });

  describe('toggleColumnSort', () => {
    it('should sort a new column in ascending order', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useTableSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 1);
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('ascending');
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith(mockSyntheticEvent(), { sortColumn: 1, sortDirection: 'ascending' });
    });

    it('should toggle sort direction on a column', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useTableSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 1);
      });

      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 1);
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('descending');
      expect(onSortChange).toHaveBeenCalledTimes(2);
      expect(onSortChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), {
        sortColumn: 1,
        sortDirection: 'descending',
      });
    });
  });

  describe('setColumnSort', () => {
    it('should sort a column in ascending order', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useTableSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.setColumnSort(mockSyntheticEvent(), 1, 'ascending');
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('ascending');
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith(mockSyntheticEvent(), { sortColumn: 1, sortDirection: 'ascending' });
    });

    it('should sort a column in descending order', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const onSortChange = jest.fn();
      const { result } = renderHook(() =>
        useTableSortState(mockTableState({ columns: columnDefinition }), { onSortChange }),
      );
      act(() => {
        result.current.sort.setColumnSort(mockSyntheticEvent(), 1, 'descending');
      });

      expect(result.current.sort.sortColumn).toBe(1);
      expect(result.current.sort.sortDirection).toBe('descending');
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith(mockSyntheticEvent(), { sortColumn: 1, sortDirection: 'descending' });
    });
  });

  describe('sort', () => {
    const createMockCompare = () => jest.fn() as unknown as TableColumnDefinition<{}>['compare'];
    it('should use the compare function for the sorted column', () => {
      const compare = createMockCompare();
      const columnDefinition = [
        createTableColumn({ columnId: 1, compare: createMockCompare() }),
        createTableColumn({ columnId: 2, compare }),
        createTableColumn({ columnId: 3, compare: createMockCompare() }),
      ];

      const { result } = renderHook(() => useTableSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 2);
      });

      result.current.sort.sort([
        { rowId: 0, item: {} },
        { rowId: 1, item: {} },
      ]);
      expect(compare).toHaveBeenCalledTimes(1);
    });

    it('should sort ascending', () => {
      const columnDefinition: TableColumnDefinition<{ value: number }>[] = [
        createTableColumn({ columnId: 1, compare: (a, b) => a.value - b.value }),
      ];

      const { result } = renderHook(() => useTableSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 1);
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
      const columnDefinition: TableColumnDefinition<{ value: number }>[] = [
        createTableColumn({ columnId: 1, compare: (a, b) => a.value - b.value }),
      ];

      const items = [{ value: 1 }, { value: 2 }];
      const { result } = renderHook(() => useTableSortState(mockTableState({ items, columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 1);
      });
      act(() => {
        result.current.sort.toggleColumnSort(mockSyntheticEvent(), 1);
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
      const columnDefinition: TableColumnDefinition<{ value: number }>[] = [createTableColumn({ columnId: 1 })];

      const { result } = renderHook(() => useTableSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.setColumnSort(mockSyntheticEvent(), 1, 'descending');
      });

      expect(result.current.sort.getSortDirection(1)).toEqual('descending');
    });

    it('should return undefined for unsorted column', () => {
      const columnDefinition: TableColumnDefinition<{ value: number }>[] = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
      ];

      const { result } = renderHook(() => useTableSortState(mockTableState({ columns: columnDefinition }), {}));
      act(() => {
        result.current.sort.setColumnSort(mockSyntheticEvent(), 1, 'descending');
      });

      expect(result.current.sort.getSortDirection(2)).toBeUndefined();
    });
  });
});

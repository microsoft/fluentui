import { renderHook, act } from '@testing-library/react-hooks';
import { ColumnDefinition } from './types';
import { useSort } from './useSort';

describe('useSort', () => {
  describe('toggleColumnSort', () => {
    it('should sort a new column in ascending order', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.toggleColumnSort(1);
      });

      expect(result.current.sortColumn).toBe(1);
      expect(result.current.sortDirection).toBe('ascending');
    });

    it('should toggle sort direction on a column', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.toggleColumnSort(1);
      });

      act(() => {
        result.current.toggleColumnSort(1);
      });

      expect(result.current.sortColumn).toBe(1);
      expect(result.current.sortDirection).toBe('descending');
    });
  });

  describe('setColumnSort', () => {
    it('should sort a column in ascending order', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.setColumnSort(1, 'ascending');
      });

      expect(result.current.sortColumn).toBe(1);
      expect(result.current.sortDirection).toBe('ascending');
    });

    it('should sort a column in descending order', () => {
      const columnDefinition = [{ columnId: 1 }, { columnId: 2 }, { columnId: 3 }];
      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.setColumnSort(1, 'descending');
      });

      expect(result.current.sortColumn).toBe(1);
      expect(result.current.sortDirection).toBe('descending');
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

      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.toggleColumnSort(2);
      });

      result.current.sort([{}, {}]);
      expect(compare).toHaveBeenCalledTimes(1);
    });

    it('should sort ascending', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [
        { columnId: 1, compare: (a, b) => a.value - b.value },
      ];

      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.toggleColumnSort(1);
      });

      const sorted = result.current.sort([{ value: 2 }, { value: 1 }]);
      expect(sorted).toEqual([{ value: 1 }, { value: 2 }]);
    });

    it('should sort ascending', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [
        { columnId: 1, compare: (a, b) => a.value - b.value },
      ];

      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.toggleColumnSort(1);
      });
      act(() => {
        result.current.toggleColumnSort(1);
      });

      const sorted = result.current.sort([{ value: 1 }, { value: 2 }]);
      expect(sorted).toEqual([{ value: 2 }, { value: 1 }]);
    });
  });

  describe('getSortDirection', () => {
    it('should return sort direction for the sorted column', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [{ columnId: 1 }];

      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.setColumnSort(1, 'descending');
      });

      expect(result.current.getSortDirection(1)).toEqual('descending');
    });

    it('should return undefined for unsorted column', () => {
      const columnDefinition: ColumnDefinition<{ value: number }>[] = [{ columnId: 1 }, { columnId: 2 }];

      const { result } = renderHook(() => useSort(columnDefinition));
      act(() => {
        result.current.setColumnSort(1, 'descending');
      });

      expect(result.current.getSortDirection(2)).toBeUndefined();
    });
  });
});

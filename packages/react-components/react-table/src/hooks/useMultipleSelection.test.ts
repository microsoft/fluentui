import { renderHook, act } from '@testing-library/react-hooks';
import { useMultipleSelection } from './useMultipleSelection';

describe('useMultipleSelection', () => {
  const items = [{ value: 'a' }, { value: 'b' }, { value: 'c' }, { value: 'd' }];

  const getRowId = (item: {}, index: number) => index;

  it('should use custom row id', () => {
    const { result } = renderHook(() => useMultipleSelection(items, (item: { value: string }) => item.value));
    act(() => {
      result.current.toggleSelectAllRows();
    });

    expect(Array.from(result.current.selectedRows)).toEqual(items.map(item => item.value));
  });

  describe('toggleSelectAllRows', () => {
    it('should select all rows', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleSelectAllRows();
      });
      expect(result.current.selectedRows.size).toBe(items.length);
      expect(Array.from(result.current.selectedRows)).toEqual(items.map((_, i) => i));
    });

    it('should deSelect all rows', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleSelectAllRows();
      });

      act(() => {
        result.current.toggleSelectAllRows();
      });

      expect(result.current.selectedRows.size).toBe(0);
    });
  });
  describe('clearSelection', () => {
    it('should clear selection', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleSelectAllRows();
      });
      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedRows.size).toBe(0);
    });
  });

  describe('selectRow', () => {
    it('should select row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.selectRow(1);
      });

      expect(result.current.selectedRows.has(1)).toBe(true);
    });

    it('should select multiple rows', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.selectRow(1);
      });

      act(() => {
        result.current.selectRow(2);
      });

      expect(result.current.selectedRows.size).toBe(2);
      expect(result.current.selectedRows.has(1)).toBe(true);
      expect(result.current.selectedRows.has(2)).toBe(true);
    });
  });

  describe('deSelectRow', () => {
    it('should make row unselected', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.selectRow(1);
      });

      act(() => {
        result.current.deSelectRow(1);
      });

      expect(result.current.selectedRows.size).toBe(0);
    });
  });

  describe('toggleRowSelect', () => {
    it('should select unselected row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleRowSelect(1);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.selectedRows.has(1)).toBe(true);
    });

    it('should deselect selected row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleRowSelect(1);
      });

      act(() => {
        result.current.toggleRowSelect(1);
      });

      expect(result.current.selectedRows.size).toBe(0);
      expect(result.current.selectedRows.has(1)).toBe(false);
    });

    it('should select another unselected row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleRowSelect(1);
      });

      act(() => {
        result.current.toggleRowSelect(2);
      });

      expect(result.current.selectedRows.size).toBe(2);
      expect(result.current.selectedRows.has(1)).toBe(true);
      expect(result.current.selectedRows.has(2)).toBe(true);
    });
  });

  describe('allRowsSelected', () => {
    it('should return true if all rows are selected', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleSelectAllRows();
      });

      expect(result.current.allRowsSelected).toBe(true);
    });

    it('should return false if there is no selected row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      expect(result.current.selectedRows.size).toBe(0);
      expect(result.current.allRowsSelected).toBe(false);
    });

    it('should return false if not all rows are selected', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.toggleSelectAllRows();
      });

      act(() => {
        result.current.deSelectRow(1);
      });

      expect(result.current.selectedRows.size).toBe(3);
      expect(result.current.allRowsSelected).toBe(false);
    });
  });

  describe('someRowsSelected', () => {
    it('should return true if there is a selected row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      act(() => {
        result.current.selectRow(1);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.someRowsSelected).toBe(true);
    });

    it('should return false if there is no selected row', () => {
      const { result } = renderHook(() => useMultipleSelection(items, getRowId));

      expect(result.current.selectedRows.size).toBe(0);
      expect(result.current.someRowsSelected).toBe(false);
    });
  });
});

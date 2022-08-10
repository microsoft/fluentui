import { renderHook, act } from '@testing-library/react-hooks';
import { useSingleSelection } from './useSingleSelection';

describe('useSingleSelection', () => {
  describe('toggleSelectAllRows', () => {
    it('should be a noop', () => {
      const { result } = renderHook(() => useSingleSelection());

      result.current.toggleSelectAllRows();
      expect(result.current.selectedRows.size).toBe(0);

      result.current.toggleSelectAllRows();
      expect(result.current.selectedRows.size).toBe(0);
    });
  });
  describe('clearSelection', () => {
    it('should clear selection', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.selectRow(1);
      });
      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedRows.size).toBe(0);
    });
  });

  describe('selectRow', () => {
    it('should select row', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.selectRow(1);
      });

      expect(result.current.selectedRows.has(1)).toBe(true);
    });

    it('should select another row', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.selectRow(1);
      });

      act(() => {
        result.current.selectRow(2);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.selectedRows.has(2)).toBe(true);
    });
  });

  describe('deSelectRow', () => {
    it('should make row unselected', () => {
      const { result } = renderHook(() => useSingleSelection());

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
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.toggleRowSelect(1);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.selectedRows.has(1)).toBe(true);
    });

    it('should deselect selected row', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.toggleRowSelect(1);
      });

      act(() => {
        result.current.toggleRowSelect(2);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.selectedRows.has(1)).toBe(false);
    });

    it('should select another unselected row', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.toggleRowSelect(1);
      });

      act(() => {
        result.current.toggleRowSelect(2);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.selectedRows.has(1)).toBe(false);
      expect(result.current.selectedRows.has(2)).toBe(true);
    });
  });

  describe('allRowsSelected', () => {
    it('should return true if there is a selected row', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.selectRow(1);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.allRowsSelected).toBe(true);
    });

    it('should return false if there is no selected row', () => {
      const { result } = renderHook(() => useSingleSelection());

      expect(result.current.selectedRows.size).toBe(0);
      expect(result.current.allRowsSelected).toBe(false);
    });
  });

  describe('someRowsSelected', () => {
    it('should return true if there is a selected row', () => {
      const { result } = renderHook(() => useSingleSelection());

      act(() => {
        result.current.selectRow(1);
      });

      expect(result.current.selectedRows.size).toBe(1);
      expect(result.current.someRowsSelected).toBe(true);
    });

    it('should return false if there is no selected row', () => {
      const { result } = renderHook(() => useSingleSelection());

      expect(result.current.selectedRows.size).toBe(0);
      expect(result.current.someRowsSelected).toBe(false);
    });
  });
});

import { renderHook, act } from '@testing-library/react-hooks';
import { ColumnDefinition } from './types';
import { useTable } from './useTable';

describe('useTable', () => {
  it('should sort data with column compare function in ascending order', () => {
    const columns: ColumnDefinition<{ value: number }>[] = [{ columnId: 1, compare: (a, b) => a.value - b.value }];
    const { result } = renderHook(() =>
      useTable({
        columns,
        items: [{ value: 2 }, { value: 3 }, { value: 1 }],
        getRowId: item => item.value,
      }),
    );

    act(() => {
      result.current.sort.toggleColumnSort(1);
    });

    expect(result.current.rows.map(row => row.rowId)).toEqual([1, 2, 3]);
  });

  it('should sort data with column compare function in descending order', () => {
    const columns: ColumnDefinition<{ value: number }>[] = [{ columnId: 1, compare: (a, b) => a.value - b.value }];
    const { result } = renderHook(() =>
      useTable({
        columns,
        items: [{ value: 2 }, { value: 3 }, { value: 1 }],
        getRowId: item => item.value,
      }),
    );

    act(() => {
      result.current.sort.toggleColumnSort(1);
    });

    act(() => {
      result.current.sort.toggleColumnSort(1);
    });

    expect(result.current.rows.map(row => row.rowId)).toEqual([3, 2, 1]);
  });

  it('should return selection state', () => {
    const { result } = renderHook(() =>
      useTable({
        columns: [{ columnId: 1 }],
        items: [{}, {}, {}],
      }),
    );

    expect(result.current.selection).toMatchInlineSnapshot(`
      Object {
        "allRowsSelected": false,
        "clearSelection": [Function],
        "deSelectRow": [Function],
        "selectRow": [Function],
        "selectedRows": Array [],
        "someRowsSelected": false,
        "toggleRowSelect": [Function],
        "toggleSelectAllRows": [Function],
      }
    `);
  });

  it('should return sort state', () => {
    const { result } = renderHook(() =>
      useTable({
        columns: [{ columnId: 1 }],
        items: [{}, {}, {}],
      }),
    );

    expect(result.current.sort).toMatchInlineSnapshot(`
      Object {
        "headerSortProps": [Function],
        "setColumnSort": [Function],
        "sortColumn": undefined,
        "sortDirection": "ascending",
        "toggleColumnSort": [Function],
      }
    `);
  });

  describe('rows', () => {
    it('should have selectRow action', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
        }),
      );

      act(() => {
        result.current.rows[1].selectRow();
      });

      expect(result.current.selection.selectedRows.length).toBe(1);
      expect(result.current.selection.selectedRows[0]).toBe(1);
    });

    it('should have deSelectRow action', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
        }),
      );

      act(() => {
        result.current.rows[1].selectRow();
      });

      act(() => {
        result.current.rows[1].deSelectRow();
      });

      expect(result.current.selection.selectedRows.length).toBe(0);
    });

    it('should have toggleSelect action', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
        }),
      );

      act(() => {
        result.current.rows[1].toggleSelect();
      });

      expect(result.current.selection.selectedRows.length).toBe(1);
      expect(result.current.selection.selectedRows[0]).toBe(1);

      act(() => {
        result.current.rows[1].toggleSelect();
      });

      expect(result.current.selection.selectedRows.length).toBe(0);
    });

    it('should have selected status of item', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
        }),
      );

      act(() => {
        result.current.rows[1].selectRow();
      });

      expect(result.current.rows[1].selected).toBe(true);
    });

    it('should use getRowId', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{ value: 'a' }],
          getRowId: item => item.value,
        }),
      );

      expect(result.current.rows[0].rowId).toBe('a');
    });
  });
});

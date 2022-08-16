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
        "isRowSelected": [Function],
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
        "getSortDirection": [Function],
        "setColumnSort": [Function],
        "sortColumn": undefined,
        "sortDirection": "ascending",
        "toggleColumnSort": [Function],
      }
    `);
  });

  describe('rowEnhancer', () => {
    it('should enahnce rows', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
          rowEnhancer: row => ({ ...row, foo: 'bar' }),
        }),
      );

      expect(result.current.rows.map(row => row.foo)).toEqual(['bar', 'bar', 'bar']);
    });

    it('should have access to state', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
          rowEnhancer: (row, { selection }) => ({ ...row, selectRow: () => selection.selectRow(row.rowId) }),
        }),
      );

      act(() => {
        result.current.rows[1].selectRow();
      });

      expect(result.current.selection.isRowSelected(1));
    });
  });

  describe('rows', () => {
    it('should return position index as rowId by default', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{}, {}, {}],
        }),
      );

      expect(result.current.rows.map(row => row.rowId)).toEqual([0, 1, 2]);
    });

    it('should return original items', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{ value: 1 }, { value: 2 }, { value: 3 }],
        }),
      );

      expect(result.current.rows.map(row => row.item)).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    it('should use custom rowId', () => {
      const { result } = renderHook(() =>
        useTable({
          columns: [{ columnId: 1 }],
          items: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
          getRowId: item => item.value,
        }),
      );

      expect(result.current.rows.map(row => row.rowId)).toEqual(['a', 'b', 'c']);
    });
  });
});

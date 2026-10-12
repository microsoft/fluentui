import type { RenderResult } from '@testing-library/react-hooks';
import { act, renderHook } from '@testing-library/react-hooks';
import { createTableColumn } from './createColumn';
import { useTableColumnResizeState } from './useTableColumnResizeState';
import type { AutoFitColumnsStrategy, ColumnResizeState, TableColumnSizingOptions } from './types';

describe('useTableColumnResizeState', () => {
  describe('default options', () => {
    let state: RenderResult<ColumnResizeState>;

    beforeEach(() => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result } = renderHook(() => useTableColumnResizeState(columnDefinition, 1000));
      state = result;
    });

    it('should return default column resizing state', () => {
      expect(state.current).toMatchInlineSnapshot(`
        Object {
          "getColumnById": [Function],
          "getColumnWidth": [Function],
          "getColumns": [Function],
          "setColumnWidth": [Function],
        }
      `);
    });

    it('getColumnById returns the proper column with proper defaults', () => {
      expect(state.current.getColumnById(1)).toMatchInlineSnapshot(`
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          }
        `);
    });

    it('getColumnWidth returns the proper columnWidth', () => {
      expect(state.current.getColumnWidth(1)).toMatchInlineSnapshot(`150`);
    });

    it('getColumnWidth returns 0 for unknown column Id', () => {
      expect(state.current.getColumnWidth('doesntExist')).toMatchInlineSnapshot(`0`);
    });

    it('getColumns returns the proper state', () => {
      expect(state.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 652,
          },
        ]
      `);
    });

    it('setColumnWidth sets width successfully', () => {
      act(() => {
        state.current.setColumnWidth(undefined, { columnId: 2, width: 500 });
      });

      expect(state.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 500,
            "minWidth": 100,
            "padding": 16,
            "width": 500,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 302,
          },
        ]
      `);
    });

    it('setColumnWidth smaller than minWidth - minWidth is set', () => {
      act(() => {
        state.current.setColumnWidth(undefined, { columnId: 2, width: 50 });
      });

      expect(state.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 100,
            "minWidth": 100,
            "padding": 16,
            "width": 100,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 702,
          },
        ]
      `);
    });
  });

  describe('callbacks', () => {
    let state: RenderResult<ColumnResizeState>;
    const onColumnResize = jest.fn();

    beforeEach(() => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result } = renderHook(() =>
        useTableColumnResizeState(columnDefinition, 1000, {
          onColumnResize,
        }),
      );
      state = result;
    });

    it('onColumnResize is called when a column is resized', () => {
      const event = new MouseEvent('move');
      act(() => state.current.setColumnWidth(event, { columnId: 1, width: 500 }));
      expect(onColumnResize).toHaveBeenCalledTimes(1);
      expect(onColumnResize).toHaveBeenCalledWith(event, { columnId: 1, width: 500 });
    });
  });

  describe("autoFitColumnsStrategy: 'even'", () => {
    const init = (targetWidth: number) => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result } = renderHook(() =>
        useTableColumnResizeState(columnDefinition, targetWidth, { autoFitColumnsStrategy: 'even' }),
      );
      return result;
    };

    it('gives every column the same width', () => {
      const state = init(1000);
      const [first, second, third] = state.current.getColumns();

      expect(first.width).toEqual(second.width);
      expect(second.width).toEqual(third.width);
    });

    it('keeps a resized column at the width it was given', () => {
      const state = init(1000);
      act(() => state.current.setColumnWidth(undefined, { columnId: 1, width: 500 }));

      expect(state.current.getColumnWidth(1)).toEqual(500);
      expect(state.current.getColumnWidth(2)).toEqual(226);
      expect(state.current.getColumnWidth(3)).toEqual(226);
    });

    it('keeps a resized column at its width when the container grows', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result, rerender } = renderHook(
        ({ containerWidth }) =>
          useTableColumnResizeState(columnDefinition, containerWidth, { autoFitColumnsStrategy: 'even' }),
        { initialProps: { containerWidth: 1000 } },
      );

      act(() => result.current.setColumnWidth(undefined, { columnId: 1, width: 500 }));
      rerender({ containerWidth: 1200 });

      expect(result.current.getColumnWidth(1)).toEqual(500);
      expect(result.current.getColumnWidth(2)).toEqual(326);
      expect(result.current.getColumnWidth(3)).toEqual(326);
    });

    it('auto-fits a resized column again once it is removed and added back', () => {
      const allColumns = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result, rerender } = renderHook(
        ({ columns }) => useTableColumnResizeState(columns, 1000, { autoFitColumnsStrategy: 'even' }),
        { initialProps: { columns: allColumns } },
      );

      act(() => result.current.setColumnWidth(undefined, { columnId: 3, width: 400 }));
      rerender({ columns: allColumns.slice(0, 2) });
      rerender({ columns: allColumns });

      const [first, second, third] = result.current.getColumns();
      expect(first.width).toEqual(second.width);
      expect(second.width).toEqual(third.width);
    });

    it('keeps a resized column at its width when another column is added', () => {
      const allColumns = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
        createTableColumn({ columnId: 4 }),
      ];
      const { result, rerender } = renderHook(
        ({ columns }) => useTableColumnResizeState(columns, 1000, { autoFitColumnsStrategy: 'even' }),
        { initialProps: { columns: allColumns.slice(0, 3) } },
      );

      act(() => result.current.setColumnWidth(undefined, { columnId: 2, width: 400 }));
      rerender({ columns: allColumns });

      expect(result.current.getColumnWidth(2)).toEqual(400);
    });

    it('moves a resized column to a width given through the column sizing options and keeps it there', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result, rerender } = renderHook(
        ({ columnSizingOptions }: { columnSizingOptions?: TableColumnSizingOptions }) =>
          useTableColumnResizeState(columnDefinition, 1000, { autoFitColumnsStrategy: 'even', columnSizingOptions }),
        { initialProps: {} },
      );

      act(() => result.current.setColumnWidth(undefined, { columnId: 1, width: 500 }));
      rerender({ columnSizingOptions: { 1: { idealWidth: 200 } } });

      // The width given through the options replaces the width the user chose, and the column
      // stays out of the sharing, so the other columns split the leftover space between them.
      expect(result.current.getColumnWidth(1)).toEqual(200);
      expect(result.current.getColumnWidth(2)).toEqual(376);
      expect(result.current.getColumnWidth(3)).toEqual(376);
    });

    it('recomputes the widths when the strategy changes', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result, rerender } = renderHook(
        ({ strategy }: { strategy: AutoFitColumnsStrategy }) =>
          useTableColumnResizeState(columnDefinition, 1000, { autoFitColumnsStrategy: strategy }),
        { initialProps: { strategy: 'last-column' as AutoFitColumnsStrategy } },
      );
      expect(result.current.getColumnWidth(3)).toEqual(652);

      rerender({ strategy: 'even' });

      const [first, second, third] = result.current.getColumns();
      expect(first.width).toEqual(second.width);
      expect(second.width).toEqual(third.width);
    });

    it('keeps a drag under the cursor after every column has been resized', () => {
      const state = init(1000);
      act(() => state.current.setColumnWidth(undefined, { columnId: 1, width: 330 }));
      act(() => state.current.setColumnWidth(undefined, { columnId: 2, width: 250 }));
      act(() => state.current.setColumnWidth(undefined, { columnId: 3, width: 402 }));

      // Every column is now deliberately sized; the next drag must still move the column exactly
      // to the requested width instead of jumping by the redistributed share.
      act(() => state.current.setColumnWidth(undefined, { columnId: 1, width: 321 }));

      expect(state.current.getColumnWidth(1)).toEqual(321);
    });

    it('ignores the strategy when auto-fit is disabled', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result } = renderHook(() =>
        useTableColumnResizeState(columnDefinition, 1000, {
          autoFitColumns: false,
          autoFitColumnsStrategy: 'even',
        }),
      );

      expect(result.current.getColumnWidth(1)).toEqual(150);
      expect(result.current.getColumnWidth(2)).toEqual(150);
      expect(result.current.getColumnWidth(3)).toEqual(150);
    });
  });

  describe('autoFitColumns: false', () => {
    const init = (targetWidth: number) => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      const { result } = renderHook(() =>
        useTableColumnResizeState(columnDefinition, targetWidth, { autoFitColumns: false }),
      );
      return result;
    };

    it("doesn't shrink", () => {
      const state = init(300);
      expect(state.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
        ]
      `);
    });

    it("doesn't expand", () => {
      const state = init(800);
      expect(state.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 2,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
          Object {
            "columnId": 3,
            "idealWidth": 150,
            "minWidth": 100,
            "padding": 16,
            "width": 150,
          },
        ]
      `);
    });
  });

  describe('controlled state - columnSizingOptions', () => {
    const columnSizingOptions: TableColumnSizingOptions = {
      1: {
        minWidth: 111,
        idealWidth: 500,
      },
      2: {
        minWidth: 120,
        idealWidth: 600,
      },
      3: {
        idealWidth: 300,
      },
    };

    it('the returned state reflects the columnSizingOptions', () => {
      const columnDefinition = [
        createTableColumn({ columnId: 1 }),
        createTableColumn({ columnId: 2 }),
        createTableColumn({ columnId: 3 }),
      ];
      let { result } = renderHook(() =>
        useTableColumnResizeState(columnDefinition, 1000, {
          columnSizingOptions,
        }),
      );

      expect(result.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 500,
            "minWidth": 111,
            "padding": 16,
            "width": 500,
          },
          Object {
            "columnId": 2,
            "idealWidth": 600,
            "minWidth": 120,
            "padding": 16,
            "width": 352,
          },
          Object {
            "columnId": 3,
            "idealWidth": 300,
            "minWidth": 100,
            "padding": 16,
            "width": 100,
          },
        ]
      `);

      columnSizingOptions['1'].minWidth = 120;

      result = renderHook(() =>
        useTableColumnResizeState(columnDefinition, 1000, {
          columnSizingOptions,
        }),
      ).result;

      expect(result.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 500,
            "minWidth": 120,
            "padding": 16,
            "width": 500,
          },
          Object {
            "columnId": 2,
            "idealWidth": 600,
            "minWidth": 120,
            "padding": 16,
            "width": 352,
          },
          Object {
            "columnId": 3,
            "idealWidth": 300,
            "minWidth": 100,
            "padding": 16,
            "width": 100,
          },
        ]
      `);

      columnSizingOptions['2'].idealWidth = 300;

      result = renderHook(() =>
        useTableColumnResizeState(columnDefinition, 1000, {
          columnSizingOptions,
        }),
      ).result;

      expect(result.current.getColumns()).toMatchInlineSnapshot(`
        Array [
          Object {
            "columnId": 1,
            "idealWidth": 500,
            "minWidth": 120,
            "padding": 16,
            "width": 500,
          },
          Object {
            "columnId": 2,
            "idealWidth": 300,
            "minWidth": 120,
            "padding": 16,
            "width": 300,
          },
          Object {
            "columnId": 3,
            "idealWidth": 300,
            "minWidth": 100,
            "padding": 16,
            "width": 152,
          },
        ]
      `);
    });
  });
});

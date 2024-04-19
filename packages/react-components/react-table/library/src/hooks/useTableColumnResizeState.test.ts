import { RenderResult, act, renderHook } from '@testing-library/react-hooks';
import { createTableColumn } from './createColumn';
import { useTableColumnResizeState } from './useTableColumnResizeState';
import { ColumnResizeState, TableColumnSizingOptions } from './types';

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

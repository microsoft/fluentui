import type { RenderResult } from '@testing-library/react-hooks';
import { act, renderHook } from '@testing-library/react-hooks';
import { createTableColumn } from './createColumn';
import { useTableColumnResizeState } from './useTableColumnResizeState';
import type { ColumnResizeState, TableColumnSizingOptions } from './types';

describe('useTableColumnResizeState', () => {
  describe.each([false, true])('inline sizing options (autoFitColumns: %s)', autoFitColumns => {
    const columns = [createTableColumn({ columnId: 'name' }), createTableColumn({ columnId: 'count' })];

    it('settles on mount and equivalent rerenders without resetting resized widths', () => {
      let renders = 0;
      const { result, rerender } = renderHook(() => {
        renders++;
        return useTableColumnResizeState(columns, 600, {
          autoFitColumns,
          columnSizingOptions: {
            name: { defaultWidth: 200, minWidth: 100 },
            count: { minWidth: 100, defaultWidth: 200 },
          },
        });
      });
      expect(result.error).toBeUndefined();
      expect(renders).toBeLessThanOrEqual(4);
      expect(result.current.getColumnWidth('name')).toBe(200);

      act(() => result.current.setColumnWidth(undefined, { columnId: 'name', width: 250 }));
      const resizedColumns = result.current.getColumns();
      const rendersBefore = renders;
      rerender();
      rerender();
      expect(result.error).toBeUndefined();
      expect(renders - rendersBefore).toBe(2);
      expect(result.current.getColumns()).toBe(resizedColumns);
      expect(result.current.getColumnWidth('name')).toBe(250);
    });

    it('applies changed ideal width, minimum width and padding with fresh equivalent options thereafter', () => {
      const { result, rerender } = renderHook(
        ({ idealWidth, minWidth, padding }) =>
          useTableColumnResizeState(columns, 600, {
            autoFitColumns,
            columnSizingOptions: { name: { idealWidth, minWidth, padding } },
          }),
        { initialProps: { idealWidth: 200, minWidth: 100, padding: 16 } },
      );
      rerender({ idealWidth: 250, minWidth: 120, padding: 24 });
      expect(result.current.getColumnById('name')).toEqual({
        columnId: 'name',
        width: 250,
        idealWidth: 250,
        minWidth: 120,
        padding: 24,
      });
      const updatedColumns = result.current.getColumns();
      rerender({ idealWidth: 250, minWidth: 120, padding: 24 });
      expect(result.current.getColumns()).toBe(updatedColumns);
      expect(result.error).toBeUndefined();
    });

    it.each(['idealWidth', 'minWidth', 'padding'] as const)('applies isolated %s changes', field => {
      const initialSizing = { idealWidth: 200, minWidth: 100, padding: 16 };
      const { result, rerender } = renderHook(
        ({ value }) =>
          useTableColumnResizeState(columns, 600, {
            autoFitColumns,
            columnSizingOptions: { name: { ...initialSizing, [field]: value } },
          }),
        { initialProps: { value: initialSizing[field] } },
      );
      const value = initialSizing[field] + 10;
      rerender({ value });
      expect(result.current.getColumnById('name')?.[field]).toBe(value);
      const updatedColumns = result.current.getColumns();
      rerender({ value });
      expect(result.current.getColumns()).toBe(updatedColumns);
    });

    it('retains changed defaults for future columns even when existing widths are unchanged', () => {
      const future = createTableColumn({ columnId: 'future' });
      const { result, rerender } = renderHook(
        ({ definitions, defaultWidth }) =>
          useTableColumnResizeState(definitions, 600, {
            autoFitColumns,
            columnSizingOptions: {
              name: { defaultWidth: 200 },
              count: { defaultWidth: 200 },
              future: { defaultWidth, minWidth: 110, padding: 20 },
            },
          }),
        { initialProps: { definitions: columns, defaultWidth: 180 } },
      );
      const originalColumns = result.current.getColumns();
      rerender({ definitions: columns, defaultWidth: 240 });
      expect(result.current.getColumns()).toBe(originalColumns);
      rerender({ definitions: [future, ...columns], defaultWidth: 240 });
      expect(result.current.getColumnById('future')).toEqual({
        columnId: 'future',
        width: 240,
        idealWidth: 240,
        minWidth: 110,
        padding: 20,
      });
      expect(result.error).toBeUndefined();
    });

    it('removes options for future columns and treats empty or undefined options equivalently', () => {
      const initialProps: { definitions: typeof columns; options: TableColumnSizingOptions | undefined } = {
        definitions: columns,
        options: { future: { defaultWidth: 240 } },
      };
      const { result, rerender } = renderHook(
        ({ definitions, options }) =>
          useTableColumnResizeState(definitions, 600, { autoFitColumns, columnSizingOptions: options }),
        { initialProps },
      );
      rerender({ definitions: columns, options: undefined });
      const clearedColumns = result.current.getColumns();
      rerender({ definitions: columns, options: { future: {} } });
      expect(result.current.getColumns()).toBe(clearedColumns);
      rerender({ definitions: [createTableColumn({ columnId: 'future' }), ...columns], options: {} });
      expect(result.current.getColumnById('future')?.idealWidth).toBe(150);
      expect(result.error).toBeUndefined();
    });

    it('uses current defaults when adding a column and changing options in the same render', () => {
      const { result, rerender } = renderHook(
        ({ definitions, defaultWidth }) =>
          useTableColumnResizeState(definitions, 600, {
            autoFitColumns,
            columnSizingOptions: { future: { defaultWidth } },
          }),
        { initialProps: { definitions: columns, defaultWidth: 180 } },
      );
      rerender({ definitions: [createTableColumn({ columnId: 'future' }), ...columns], defaultWidth: 240 });
      expect(result.current.getColumnById('future')?.width).toBe(240);
      expect(result.current.getColumnById('future')?.idealWidth).toBe(240);
      expect(result.error).toBeUndefined();
    });
  });

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

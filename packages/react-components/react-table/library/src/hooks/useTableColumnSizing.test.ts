import { RenderHookResult, renderHook } from '@testing-library/react-hooks';
import { useTableColumnSizing_unstable as useTableColumnSizing } from './useTableColumnSizing';
import { createTableColumn } from './createColumn';
import { mockTableState } from '../testing/mockTableState';
import { TableFeaturesState } from './types';

const mockColumnResizeState = {
  getColumnWidth: jest.fn(),
  setColumnWidth: jest.fn(),
  getColumns: jest.fn(),
  getColumnById: jest.fn(() => ({
    columnId: 1,
    idealWidth: 150,
    minWidth: 100,
    padding: 16,
    width: 150,
  })),
};

jest.mock('../../../../react-utilities/src/index', () => {
  const module = jest.requireActual('../../../../react-utilities/src/index');
  return { ...module, canUseDOM: () => false };
});

jest.mock('./useMeasureElement', () => ({
  useMeasureElement: jest.fn(() => ({ width: 1000, measureElementRef: jest.fn() })),
}));

jest.mock('./useTableColumnResizeState', () => {
  return {
    useTableColumnResizeState: () => mockColumnResizeState,
  };
});

const mockGetOnMouseDown = jest.fn();
jest.mock('./useTableColumnResizeMouseHandler', () => {
  return {
    useTableColumnResizeMouseHandler: jest.fn(() => ({
      getOnMouseDown: mockGetOnMouseDown,
    })),
  };
});

describe('useTableColumnSizing', () => {
  let renderHookResult: RenderHookResult<unknown, TableFeaturesState<unknown>>;

  beforeAll(() => {
    const columnDefinition = [
      createTableColumn({ columnId: 1 }),
      createTableColumn({ columnId: 2 }),
      createTableColumn({ columnId: 3 }),
    ];

    renderHookResult = renderHook(() => useTableColumnSizing()(mockTableState({ columns: columnDefinition })));
  });

  it('enhances table state properly', () => {
    expect(renderHookResult.result.current.columnSizing_unstable).toMatchInlineSnapshot(`
      Object {
        "enableKeyboardMode": [Function],
        "getColumnWidths": [MockFunction],
        "getOnMouseDown": [MockFunction],
        "getTableCellProps": [Function],
        "getTableHeaderCellProps": [Function],
        "getTableProps": [Function],
        "setColumnWidth": [Function],
      }
    `);

    expect(renderHookResult.result.current.tableRef).toMatchInlineSnapshot(`[MockFunction]`);
  });

  it('getOnMouseDown calls the function returned from useColumnResizeMouseHandler hook', () => {
    renderHookResult.result.current.columnSizing_unstable.getOnMouseDown(1);
    expect(mockGetOnMouseDown).toHaveBeenCalledWith(1);
  });

  it('setColumnWidth calls the function returned from useTableColumnResizeState hook', () => {
    renderHookResult.result.current.columnSizing_unstable.setColumnWidth(1, 100);
    expect(mockColumnResizeState.setColumnWidth).toHaveBeenCalledWith(undefined, { columnId: 1, width: 100 });
  });

  it('getColumnWidths calls the function returned from useTableColumnResizeState hook', () => {
    renderHookResult.result.current.columnSizing_unstable.getColumnWidths();
    expect(mockColumnResizeState.getColumns).toHaveBeenCalled();
  });

  it('getTableHeaderCellProps returns the correct props for the column', () => {
    const props = renderHookResult.result.current.columnSizing_unstable.getTableHeaderCellProps(1);
    expect(props).toMatchInlineSnapshot(`
      Object {
        "aside": <TableResizeHandle
          aria-hidden={true}
          aria-label="Resize column"
          aria-valuetext="150 pixels"
          data-tabster="{\\"focusable\\":{\\"ignoreKeydown\\":{\\"ArrowLeft\\":true,\\"ArrowRight\\":true}}}"
          onBlur={[Function]}
          onKeyDown={[Function]}
          role="separator"
        />,
        "style": Object {
          "maxWidth": 150,
          "minWidth": 150,
          "width": 150,
        },
      }
    `);
  });

  it('getTableCellProps returns the correct props for the column', () => {
    const props = renderHookResult.result.current.columnSizing_unstable.getTableCellProps(1);
    expect(props).toMatchInlineSnapshot(`
      Object {
        "style": Object {
          "maxWidth": 150,
          "minWidth": 150,
          "width": 150,
        },
      }
    `);
  });
});

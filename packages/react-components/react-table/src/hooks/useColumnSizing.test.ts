import { RenderHookResult, renderHook } from '@testing-library/react-hooks';
import { useColumnSizing_unstable as useColumnSizing } from './useColumnSizing';
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

jest.mock('../../../react-utilities/src/index', () => {
  const module = jest.requireActual('../../../react-utilities/src/index');
  return { ...module, canUseDOM: () => false };
});

jest.mock('./useMeasureElement', () => ({
  useMeasureElement: jest.fn(() => 1000),
}));

jest.mock('./useColumnResizeState', () => {
  return {
    useColumnResizeState: () => mockColumnResizeState,
  };
});

const mockGetOnMouseDown = jest.fn();
jest.mock('./useColumnResizeMouseHandler', () => {
  return {
    default: jest.fn(() => ({
      getOnMouseDown: mockGetOnMouseDown,
    })),
  };
});

describe('useColumnSizing', () => {
  let renderHookResult: RenderHookResult<unknown, TableFeaturesState<unknown>>;

  beforeAll(() => {
    const columnDefinition = [
      createTableColumn({ columnId: 1 }),
      createTableColumn({ columnId: 2 }),
      createTableColumn({ columnId: 3 }),
    ];

    renderHookResult = renderHook(() => useColumnSizing()(mockTableState({ columns: columnDefinition })));
  });

  it('enhances tabel state properly', () => {
    expect(renderHookResult.result.current.columnSizing).toMatchInlineSnapshot(`
      Object {
        "getColumnProps": [Function],
        "getColumnWidth": [Function],
        "getColumnWidths": [Function],
        "getOnMouseDown": [Function],
        "setColumnWidth": [Function],
      }
    `);

    expect(renderHookResult.result.current.tableRef).toMatchInlineSnapshot(`[Function]`);
  });

  it('getOnMouseDown calls the function returned from useColumnResizeMouseHandler hook', () => {
    renderHookResult.result.current.columnSizing.getOnMouseDown(1);
    expect(mockGetOnMouseDown).toHaveBeenCalledWith(1);
  });

  it('getColumnWidth calls the function returned from useColumnResizeState hook', () => {
    renderHookResult.result.current.columnSizing.getColumnWidth(1);
    expect(mockColumnResizeState.getColumnWidth).toHaveBeenCalledWith(1);
  });

  it('setColumnWidth calls the function returned from useColumnResizeState hook', () => {
    renderHookResult.result.current.columnSizing.setColumnWidth(1, 100);
    expect(mockColumnResizeState.setColumnWidth).toHaveBeenCalledWith(1, 100);
  });

  it('getColumnWidths calls the function returned from useColumnResizeState hook', () => {
    renderHookResult.result.current.columnSizing.getColumnWidths();
    expect(mockColumnResizeState.getColumns).toHaveBeenCalled();
  });

  it('getColumnProps returns the correct props for the column', () => {
    const props = renderHookResult.result.current.columnSizing.getColumnProps(1);
    expect(props).toMatchInlineSnapshot(`
      Object {
        "aside": <TableResizeHandle />,
        "style": Object {
          "maxWidth": 150,
          "minWidth": 150,
          "width": 150,
        },
      }
    `);
  });
});

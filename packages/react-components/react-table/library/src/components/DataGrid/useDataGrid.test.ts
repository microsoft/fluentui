import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useDataGrid_unstable } from './useDataGrid';
import { useDataGridContextValues_unstable } from './useDataGridContextValues';
import { createTableColumn } from '../../hooks';

const columns = [createTableColumn({ columnId: 'name' }), createTableColumn({ columnId: 'age' })];
const items = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

describe('useDataGrid_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('returns default state with table element and medium size', () => {
    const { result } = renderHook(() => useDataGrid_unstable({ columns, items }, ref));

    expect(result.current).toMatchObject({
      components: { root: 'table' },
      size: 'medium',
      noNativeElements: false,
      focusMode: 'cell',
      selectableRows: false,
    });
  });

  it('reflects selectionMode in selectableRows', () => {
    const { result } = renderHook(() => useDataGrid_unstable({ columns, items, selectionMode: 'multiselect' }, ref));

    expect(result.current.selectableRows).toBe(true);
  });

  it('exposes sorted rows via tableState', () => {
    const { result } = renderHook(() => useDataGrid_unstable({ columns, items }, ref));

    expect(result.current.tableState.getRows()).toHaveLength(items.length);
  });

  it('reflects resizableColumns prop', () => {
    const { result } = renderHook(() => useDataGrid_unstable({ columns, items, resizableColumns: true }, ref));

    expect(result.current.resizableColumns).toBe(true);
  });
});

describe('useDataGridContextValues_unstable', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('includes table and dataGrid context', () => {
    const { result } = renderHook(() => {
      const state = useDataGrid_unstable({ columns, items }, ref);
      return useDataGridContextValues_unstable(state);
    });

    expect(result.current).toMatchObject({
      table: {
        size: 'medium',
        noNativeElements: false,
        sortable: false,
      },
      dataGrid: expect.objectContaining({
        focusMode: 'cell',
        selectableRows: false,
      }),
    });
  });

  it('reflects selectionMode in dataGrid context', () => {
    const { result } = renderHook(() => {
      const state = useDataGrid_unstable({ columns, items, selectionMode: 'single' }, ref);
      return useDataGridContextValues_unstable(state);
    });

    expect(result.current.dataGrid.selectableRows).toBe(true);
  });
});

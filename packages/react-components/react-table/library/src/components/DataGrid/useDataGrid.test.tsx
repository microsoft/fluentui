// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { useDataGrid_unstable } from './useDataGrid';
import type { DataGridProps } from './DataGrid.types';
import { createTableColumn } from '../../hooks';

interface Item {
  name: string;
}

const columns = [createTableColumn<Item>({ columnId: 'name' })];
const items: Item[] = [{ name: 'a' }, { name: 'b' }];

jest.mock('../../hooks/useMeasureElement', () => {
  return { useMeasureElement: () => ({ width: 1000, measureElementRef: jest.fn() }) };
});

const renderDataGridHook = (props: Partial<DataGridProps> = {}) =>
  renderHook(() => useDataGrid_unstable({ items, columns, ...props }, React.createRef())).result.current;

const getTabsterAttribute = (element: object) => (element as { 'data-tabster'?: string })['data-tabster'];

describe('useDataGrid_unstable', () => {
  it('renders a div with the grid role and no native elements', () => {
    const state = renderDataGridHook();

    expect(state.components.root).toBe('div');
    expect(state.root.role).toBe('grid');
    expect(state.noNativeElements).toBe(true);
  });

  it('applies the documented defaults', () => {
    const state = renderDataGridHook();

    expect(state.focusMode).toBe('cell');
    expect(state.selectableRows).toBe(false);
    expect(state.subtleSelection).toBe(false);
    expect(state.selectionAppearance).toBe('brand');
    expect(state.resizableColumns).toBeUndefined();
    expect(state.size).toBe('medium');
    expect(state.sortable).toBe(false);
  });

  it('exposes the table features state', () => {
    const state = renderDataGridHook({ selectionMode: 'multiselect' });

    expect(state.tableState.getRows()).toHaveLength(2);
    expect(state.tableState.columns).toBe(columns);
    expect(state.tableState.selection.selectionMode).toBe('multiselect');
    expect(state.tableState.sort.getSortDirection('name')).toBeUndefined();
  });

  it('forwards selection related props', () => {
    const state = renderDataGridHook({
      selectionMode: 'single',
      subtleSelection: true,
      selectionAppearance: 'neutral',
    });

    expect(state.selectableRows).toBe(true);
    expect(state.subtleSelection).toBe(true);
    expect(state.selectionAppearance).toBe('neutral');
    expect(state.tableState.selection.selectionMode).toBe('single');
  });

  it('seeds the initial selection and sort state', () => {
    const state = renderDataGridHook({
      selectionMode: 'multiselect',
      defaultSelectedItems: [0],
      defaultSortState: { sortColumn: 'name', sortDirection: 'descending' },
    });

    expect(state.tableState.selection.isRowSelected(0)).toBe(true);
    expect(state.tableState.selection.isRowSelected(1)).toBe(false);
    expect(state.tableState.sort.getSortDirection('name')).toBe('descending');
  });

  it('uses Tabster arrow navigation attributes on the root for the cell focus mode', () => {
    const state = renderDataGridHook({ focusMode: 'cell' });

    expect(getTabsterAttribute(state.root)).toContain('"mover"');
    expect(getTabsterAttribute(state.root)).toContain('"cyclic"');
  });

  it('does not use Tabster attributes on the root for the none focus mode', () => {
    const state = renderDataGridHook({ focusMode: 'none' });

    expect(getTabsterAttribute(state.root)).toBeUndefined();
  });

  it('uses a Tabster mover on the root and a row groupper for the composite focus mode', () => {
    const state = renderDataGridHook({ focusMode: 'composite' });

    expect(getTabsterAttribute(state.root)).toContain('"mover"');
    expect(state.compositeRowTabsterAttribute['data-tabster']).toContain('"groupper"');
  });

  it('calls the consumer onKeyDown', () => {
    const onKeyDown = jest.fn();
    const state = renderDataGridHook({ onKeyDown });
    const event = { key: 'a', ctrlKey: false, defaultPrevented: false } as React.KeyboardEvent<HTMLTableElement>;

    state.root.onKeyDown?.(event);

    expect(onKeyDown).toHaveBeenCalledWith(event);
  });

  it('merges the column sizing table props when columns are resizable', () => {
    const resizable = renderDataGridHook({ resizableColumns: true });
    const fixed = renderDataGridHook();

    expect(resizable.resizableColumns).toBe(true);
    expect(resizable.root.style).toBeDefined();
    expect(fixed.root.style).toBeUndefined();
  });
});

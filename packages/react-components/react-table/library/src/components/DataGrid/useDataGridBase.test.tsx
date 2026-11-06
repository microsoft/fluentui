import * as React from 'react';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { useDataGridBase_unstable } from './useDataGrid';
import { useDataGridRowBase_unstable } from '../DataGridRow/useDataGridRow';
import { useDataGridCellBase_unstable } from '../DataGridCell/useDataGridCell';
import { useDataGridHeaderCellBase_unstable } from '../DataGridHeaderCell/useDataGridHeaderCell';
import { useDataGridSelectionCellBase_unstable } from '../DataGridSelectionCell/useDataGridSelectionCell';
import { renderDataGrid_unstable } from './renderDataGrid';
import { useDataGridContextValues_unstable } from './useDataGridContextValues';
import { renderDataGridRow_unstable } from '../DataGridRow/renderDataGridRow';
import { renderDataGridCell_unstable } from '../DataGridCell/renderDataGridCell';
import { renderDataGridHeaderCell_unstable } from '../DataGridHeaderCell/renderDataGridHeaderCell';
import { renderDataGridSelectionCell_unstable } from '../DataGridSelectionCell/renderDataGridSelectionCell';
import { renderTableHeader_unstable } from '../TableHeader/renderTableHeader';
import { useTableHeader_unstable } from '../TableHeader/useTableHeader';
import { useDataGridBody_unstable } from '../DataGridBody/useDataGridBody';
import { renderDataGridBody_unstable } from '../DataGridBody/renderDataGridBody';
import type { DataGridBaseProps } from './DataGrid.types';
import { createTableColumn } from '../../hooks';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';

jest.mock('../../hooks/useMeasureElement', () => {
  return { useMeasureElement: () => ({ width: 1000, measureElementRef: jest.fn() }) };
});

interface Item {
  name: string;
  age: number;
}

const items: Item[] = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
];
const columns = [
  createTableColumn<Item>({ columnId: 'name', compare: (a, b) => a.name.localeCompare(b.name) }),
  createTableColumn<Item>({ columnId: 'age' }),
];

const DataGrid = ({ children, ...props }: Partial<DataGridBaseProps> & { children?: React.ReactNode }) => {
  const state = useDataGridBase_unstable(
    { items, columns, children, ...props } as DataGridBaseProps,
    React.createRef(),
  );
  return renderDataGrid_unstable(state, useDataGridContextValues_unstable(state));
};

const Row = ({ children }: { children: Parameters<typeof useDataGridRowBase_unstable>[0]['children'] }) => {
  const state = useDataGridRowBase_unstable({ children }, React.createRef());
  return renderDataGridRow_unstable(state);
};
const Cell = (props: { children?: React.ReactNode }) =>
  renderDataGridCell_unstable(useDataGridCellBase_unstable(props, React.createRef()));
const HeaderCell = (props: { children?: React.ReactNode }) =>
  renderDataGridHeaderCell_unstable(useDataGridHeaderCellBase_unstable(props, React.createRef()));
const SelectionCell = () =>
  renderDataGridSelectionCell_unstable(useDataGridSelectionCellBase_unstable({}, React.createRef()));
const Header = ({ children }: { children?: React.ReactNode }) =>
  renderTableHeader_unstable(useTableHeader_unstable({ as: 'div', children }, React.createRef()));
const Body = () =>
  renderDataGridBody_unstable(
    useDataGridBody_unstable(
      {
        children: ({ item, rowId }) => (
          <Row key={rowId}>
            {({ columnId }) => <Cell key={columnId}>{String((item as Item)[columnId as keyof Item])}</Cell>}
          </Row>
        ),
      },
      React.createRef(),
    ),
  );

const renderGrid = (props: Partial<DataGridBaseProps> = {}) =>
  render(
    <DataGrid aria-label="People" {...props}>
      <Header>
        <Row>{({ columnId }) => <HeaderCell key={columnId}>{columnId}</HeaderCell>}</Row>
      </Header>
      <Body />
    </DataGrid>,
  );

const tabsterAttribute = (state: { root: object }) => (state.root as { 'data-tabster'?: string })['data-tabster'];

describe('useDataGridBase_unstable', () => {
  it('has no design state and no Tabster attributes', () => {
    const { result } = renderHook(() =>
      useDataGridBase_unstable({ items, columns, size: 'small' } as DataGridBaseProps, React.createRef()),
    );

    expect(result.current).not.toHaveProperty('size');
    expect(result.current).not.toHaveProperty('subtleSelection');
    expect(result.current).not.toHaveProperty('selectionAppearance');
    expect(result.current).not.toHaveProperty('compositeRowTabsterAttribute');
    expect(tabsterAttribute(result.current)).toBeUndefined();
    expect(result.current.root.role).toBe('grid');
    expect(result.current.focusMode).toBe('cell');
    expect(result.current.selectableRows).toBe(false);
  });

  it('provides defaults for the design state in the context values', () => {
    const { result } = renderHook(() => {
      const state = useDataGridBase_unstable({ items, columns }, React.createRef());
      return useDataGridContextValues_unstable(state);
    });

    expect(result.current.dataGrid.subtleSelection).toBe(false);
    expect(result.current.dataGrid.selectionAppearance).toBe('brand');
    expect(result.current.table.size).toBe('medium');
  });
});

describe('DataGrid built from the base hooks', () => {
  it('renders the grid roles without any Tabster attribute', () => {
    const { container, getAllByRole, getByRole } = renderGrid();

    expect(getByRole('grid', { name: 'People' })).toBeTruthy();
    expect(getAllByRole('row')).toHaveLength(4);
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('gridcell')).toHaveLength(6);
    expect(container.querySelector('[data-tabster]')).toBeNull();
  });

  it('makes cells and header cells tabbable in the cell focus mode', () => {
    const { getAllByRole } = renderGrid();

    getAllByRole('gridcell').forEach(cell => expect(cell.tabIndex).toBe(0));
    getAllByRole('columnheader').forEach(cell => expect(cell.tabIndex).toBe(0));
  });

  it('makes rows tabbable in the row focus mode', () => {
    const { getAllByRole } = renderGrid({ focusMode: 'row_unstable' });
    const [headerRow, ...bodyRows] = getAllByRole('row');

    expect(headerRow.hasAttribute('tabindex')).toBe(false);
    bodyRows.forEach(row => expect(row.tabIndex).toBe(0));
    getAllByRole('gridcell').forEach(cell => expect(cell.hasAttribute('tabindex')).toBe(false));
  });

  it('selects rows on click and toggles all rows through the header selection cell', () => {
    const onSelectionChange = jest.fn();
    const { getAllByRole } = render(
      <DataGrid aria-label="People" selectionMode="multiselect" onSelectionChange={onSelectionChange}>
        <Header>
          <Row>{() => null}</Row>
        </Header>
        <Body />
      </DataGrid>,
    );
    const rows = getAllByRole('row');

    fireEvent.click(rows[1]);
    expect(rows[1].getAttribute('aria-selected')).toBe('true');
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedItems: new Set([0]) }),
    );

    fireEvent.click(rows[1]);
    expect(rows[1].getAttribute('aria-selected')).toBe('false');
  });

  it('exposes row selection state on the base row state', () => {
    const { result } = renderHook(() => {
      const grid = useDataGridBase_unstable(
        { items, columns, selectionMode: 'multiselect', defaultSelectedItems: [0] },
        React.createRef(),
      );
      return { grid, contextValues: useDataGridContextValues_unstable(grid) };
    });

    expect(result.current.grid.selectableRows).toBe(true);
    expect(result.current.grid.tableState.selection.isRowSelected(0)).toBe(true);
  });

  it('renders a selection cell with native inputs when the caller renders one', () => {
    const { container } = render(
      <DataGrid aria-label="People" selectionMode="multiselect">
        <Body />
        <SelectionCell />
      </DataGrid>,
    );

    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
    expect(container.querySelector('.fui-Checkbox')).toBeNull();
  });
});

describe('DataGrid base column resizing', () => {
  it('renders unstyled resize handles without Tabster attributes', () => {
    const { container, getAllByRole } = renderGrid({ resizableColumns: true });
    const handles = getAllByRole('separator', { hidden: true });

    // The last column has no handle when the columns are auto fitted
    expect(handles).toHaveLength(1);
    expect(handles[0].hasAttribute('class')).toBe(false);
    expect(container.querySelector('[data-tabster]')).toBeNull();
  });

  it('moves focus back to the header cell when the keyboard resizing mode ends', () => {
    let enableKeyboardMode: ReturnType<typeof useDataGridContext_unstable<unknown>> | undefined;
    const KeyboardModeProbe = () => {
      enableKeyboardMode = useDataGridContext_unstable(ctx => ctx.columnSizing_unstable.enableKeyboardMode);
      return null;
    };
    const { getAllByRole } = render(
      <DataGrid aria-label="People" resizableColumns>
        <KeyboardModeProbe />
        <Header>
          <Row>{({ columnId }) => <HeaderCell key={columnId}>{columnId}</HeaderCell>}</Row>
        </Header>
        <Body />
      </DataGrid>,
    );
    const headers = getAllByRole('columnheader');
    const fakeEvent = { preventDefault: jest.fn(), nativeEvent: { stopPropagation: jest.fn() } };

    act(() => {
      (enableKeyboardMode as (columnId: string) => (e: unknown) => void)('name')(fakeEvent);
    });
    const handle = getAllByRole('separator')[0];
    expect(document.activeElement).toBe(handle);

    act(() => {
      fireEvent.keyDown(handle, { key: 'Escape' });
    });
    expect(document.activeElement).toBe(headers[0]);
  });
});

describe('DataGrid base keyboard navigation', () => {
  const press = (element: Element, key: string, init: KeyboardEventInit = {}) => {
    fireEvent.keyDown(element, { key, ...init });
  };

  it('moves to the cell in the same column of the next and previous row with the arrow keys', () => {
    const { getAllByRole } = renderGrid();
    const cells = getAllByRole('gridcell');
    const headers = getAllByRole('columnheader');

    cells[1].focus(); // first row, second column
    press(cells[1], 'ArrowDown');
    expect(document.activeElement).toBe(cells[3]);

    press(cells[3], 'ArrowDown');
    expect(document.activeElement).toBe(cells[5]);

    // stops at the last row
    press(cells[5], 'ArrowDown');
    expect(document.activeElement).toBe(cells[5]);

    press(cells[5], 'ArrowUp');
    press(cells[3], 'ArrowUp');
    press(cells[1], 'ArrowUp');
    expect(document.activeElement).toBe(headers[1]);
  });

  it('prevents the default of handled keys only', () => {
    const { getAllByRole } = renderGrid();
    const cells = getAllByRole('gridcell');

    expect(fireEvent.keyDown(cells[0], { key: 'ArrowDown' })).toBe(false);
    expect(fireEvent.keyDown(cells[0], { key: 'a' })).toBe(true);
    // ArrowLeft and ArrowRight are left to the focusgroup attribute
    expect(fireEvent.keyDown(cells[0], { key: 'ArrowRight' })).toBe(true);
  });

  it('moves to the first and last cell of the row with Home and End', () => {
    const { getAllByRole } = renderGrid();
    const cells = getAllByRole('gridcell');

    cells[2].focus();
    press(cells[2], 'End');
    expect(document.activeElement).toBe(cells[3]);

    press(cells[3], 'Home');
    expect(document.activeElement).toBe(cells[2]);
  });

  it('handles Home and End before listeners of the grid element, such as the focusgroup polyfill', () => {
    const { getAllByRole, getByRole } = renderGrid();
    const cells = getAllByRole('gridcell');
    const defaultPreventedOnGrid: Record<string, boolean> = {};
    getByRole('grid').addEventListener('keydown', e => {
      defaultPreventedOnGrid[e.key] = e.defaultPrevented;
    });

    cells[2].focus();
    fireEvent.keyDown(cells[2], { key: 'End' });
    fireEvent.keyDown(cells[3], { key: 'Home' });
    fireEvent.keyDown(cells[3], { key: 'ArrowDown' });

    expect(defaultPreventedOnGrid).toEqual({ End: true, Home: true, ArrowDown: false });
  });

  it('moves to the first and last focusable element of the grid with Ctrl+Home and Ctrl+End', () => {
    const { getAllByRole } = renderGrid();
    const cells = getAllByRole('gridcell');
    const headers = getAllByRole('columnheader');

    cells[2].focus();
    press(cells[2], 'End', { ctrlKey: true });
    expect(document.activeElement).toBe(cells[5]);

    press(cells[5], 'Home', { ctrlKey: true });
    expect(document.activeElement).toBe(headers[0]);
  });

  it('skips rows and cells that are not rendered', () => {
    const { getAllByRole } = renderGrid();
    const rows = getAllByRole('row');
    const cells = getAllByRole('gridcell');

    rows[2].style.display = 'none';
    cells[1].focus();
    press(cells[1], 'ArrowDown');
    expect(document.activeElement).toBe(cells[5]);

    // The hidden last cell is skipped, the current cell is the last rendered one
    cells[3].style.visibility = 'hidden';
    cells[2].focus();
    press(cells[2], 'End');
    expect(document.activeElement).toBe(cells[2]);

    rows[2].style.display = '';
    rows[3].style.display = 'none';
    press(cells[2], 'End', { ctrlKey: true });
    expect(document.activeElement).toBe(cells[2]);
  });

  it('does not handle the key when the target does not receive focus', () => {
    const { getAllByRole } = renderGrid();
    const cells = getAllByRole('gridcell');
    cells[5].focus = () => undefined;
    cells[4].focus = () => undefined;

    cells[3].focus();
    expect(fireEvent.keyDown(cells[3], { key: 'ArrowDown' })).toBe(true);
    expect(document.activeElement).toBe(cells[3]);
  });

  it('leaves the keys of a nested grid to that grid', () => {
    const { getByText } = render(
      <DataGrid aria-label="People">
        <Header>
          <Row>{({ columnId }) => <HeaderCell key={columnId}>{columnId}</HeaderCell>}</Row>
        </Header>
        <Row>
          {({ columnId }) => (
            <Cell key={columnId}>
              {columnId === 'name' && (
                <div role="grid" aria-label="Nested">
                  <div role="row">
                    <div role="gridcell" tabIndex={0}>
                      nested
                    </div>
                  </div>
                </div>
              )}
            </Cell>
          )}
        </Row>
        <Row>{({ columnId }) => <Cell key={columnId}>{String(columnId)}</Cell>}</Row>
      </DataGrid>,
    );
    const nestedCell = getByText('nested');

    nestedCell.focus();
    expect(fireEvent.keyDown(nestedCell, { key: 'ArrowDown' })).toBe(true);
    expect(fireEvent.keyDown(nestedCell, { key: 'End', ctrlKey: true })).toBe(true);
    expect(document.activeElement).toBe(nestedCell);
  });

  it('moves to the first and last row with Ctrl+Home and Ctrl+End in the row focus mode', () => {
    const { getAllByRole } = renderGrid({ focusMode: 'row_unstable' });
    const rows = getAllByRole('row');
    const headers = getAllByRole('columnheader');

    rows[1].focus();
    press(rows[1], 'End', { ctrlKey: true });
    expect(document.activeElement).toBe(rows[3]);

    press(rows[3], 'Home', { ctrlKey: true });
    expect(document.activeElement).toBe(headers[0]);
  });

  it('does not navigate with the arrow keys in the row focus mode', () => {
    const { getAllByRole } = renderGrid({ focusMode: 'row_unstable' });
    const rows = getAllByRole('row');

    rows[1].focus();
    expect(fireEvent.keyDown(rows[1], { key: 'ArrowDown' })).toBe(true);
    expect(document.activeElement).toBe(rows[1]);
  });

  it('does not intercept keys that belong to text inputs', () => {
    const { container } = render(
      <DataGrid aria-label="People">
        <Header>
          <Row>{({ columnId }) => <HeaderCell key={columnId}>{columnId}</HeaderCell>}</Row>
        </Header>
        <Row>
          {({ columnId }) => (
            <Cell key={columnId}>
              <input aria-label={String(columnId)} />
            </Cell>
          )}
        </Row>
      </DataGrid>,
    );
    const input = container.querySelector('input') as HTMLInputElement;

    input.focus();
    expect(fireEvent.keyDown(input, { key: 'ArrowUp' })).toBe(true);
    expect(fireEvent.keyDown(input, { key: 'Home' })).toBe(true);
    expect(document.activeElement).toBe(input);
  });

  it('calls the consumer onKeyDown first and respects its preventDefault', () => {
    const onKeyDown = jest.fn((e: React.KeyboardEvent) => e.preventDefault());
    const { getAllByRole, getByRole } = renderGrid({ onKeyDown });
    const cells = getAllByRole('gridcell');

    cells[0].focus();
    fireEvent.keyDown(cells[0], { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(getByRole('grid')).toBeTruthy();
    expect(document.activeElement).toBe(cells[0]);
  });
});

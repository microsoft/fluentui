// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useTableHeaderCell_unstable } from './useTableHeaderCell';
import { TableHeaderCell } from './TableHeaderCell';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

describe('useTableHeaderCell_unstable', () => {
  it('renders a native th by default', () => {
    const { result } = renderHook(() => useTableHeaderCell_unstable({}, React.createRef()));

    expect(result.current.components).toEqual({ root: 'th', button: 'div', sortIcon: 'span', aside: 'span' });
    expect(result.current.root.role).toBeUndefined();
    expect(result.current.root['aria-sort']).toBeUndefined();
    expect(result.current.sortable).toBe(false);
    expect(result.current.sortIcon).toBeUndefined();
    expect(result.current.aside).toBeUndefined();
  });

  it('renders a columnheader div with `noNativeElements`', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        {children}
      </TableContextProvider>
    );
    const { result } = renderHook(() => useTableHeaderCell_unstable({}, React.createRef()), { wrapper });

    expect(result.current.components.root).toBe('div');
    expect(result.current.root.role).toBe('columnheader');
  });

  it('takes sortable from the table context unless the prop overrides it', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <TableContextProvider value={{ ...tableContextDefaultValue, sortable: true }}>{children}</TableContextProvider>
    );

    expect(
      renderHook(() => useTableHeaderCell_unstable({}, React.createRef()), { wrapper }).result.current.sortable,
    ).toBe(true);
    expect(
      renderHook(() => useTableHeaderCell_unstable({ sortable: false }, React.createRef()), { wrapper }).result.current
        .sortable,
    ).toBe(false);
  });

  it('exposes aria-sort only when sortable', () => {
    const sortable = renderHook(() => useTableHeaderCell_unstable({ sortable: true }, React.createRef()));
    expect(sortable.result.current.root['aria-sort']).toBe('none');

    const ascending = renderHook(() =>
      useTableHeaderCell_unstable({ sortable: true, sortDirection: 'ascending' }, React.createRef()),
    );
    expect(ascending.result.current.root['aria-sort']).toBe('ascending');

    const notSortable = renderHook(() =>
      useTableHeaderCell_unstable({ sortable: false, sortDirection: 'ascending' }, React.createRef()),
    );
    expect(notSortable.result.current.root['aria-sort']).toBeUndefined();
  });

  it('renders the default sort icon for the sort direction', () => {
    const ascending = renderHook(() => useTableHeaderCell_unstable({ sortDirection: 'ascending' }, React.createRef()));
    const descending = renderHook(() =>
      useTableHeaderCell_unstable({ sortDirection: 'descending' }, React.createRef()),
    );

    expect(ascending.result.current.sortIcon).toBeDefined();
    expect(descending.result.current.sortIcon).toBeDefined();
    expect(ascending.result.current.sortIcon?.children).not.toBe(descending.result.current.sortIcon?.children);
  });

  it('turns the button into an ARIA button when sortable', () => {
    const { getByRole, queryByRole, rerender } = render(<TableHeaderCell sortable>Header</TableHeaderCell>, {
      container: document.body.appendChild(document.createElement('tr')),
    });

    const button = getByRole('button');
    expect(button.tabIndex).toBe(0);

    rerender(<TableHeaderCell>Header</TableHeaderCell>);
    expect(queryByRole('button')).toBeNull();
  });
});
